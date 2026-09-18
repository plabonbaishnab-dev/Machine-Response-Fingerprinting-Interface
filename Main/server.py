# # from flask import Flask, jsonify, render_template
# # import serial
# # import serial.tools.list_ports
# # import threading

# # app = Flask(__name__)

# # # 🔹 Automatically detect Arduino port
# # def find_arduino():
# #     ports = list(serial.tools.list_ports.comports())
# #     for p in ports:
# #         if "Arduino" in p.description:
# #             return p.device
# #     return None

# # PORT = "COM3"   
# # print(f"Using Arduino on {PORT}")


# # BAUD_RATE = 9600

# # # Serial connection
# # try:
# #     ser = serial.Serial(PORT, BAUD_RATE, timeout=1)
# #     print(f"Connected to Arduino on {PORT}")
# # except Exception as e:
# #     print("Failed to connect to Arduino:", e)
# #     exit()

# # # Store latest parking data
# # latest_data = {
# #     "occupied": 0,
# #     "available": 0
# # }

# # # 🔁 Background thread to read Arduino continuously
# # def read_serial():
# #     global latest_data
# #     while True:
# #         try:
# #             if ser.in_waiting:
# #                 line = ser.readline().decode("utf-8").strip()
# #                 print("Received:", line)  # Debug print

# #                 if "OCCUPIED" in line:
# #                     parts = line.split("|")
# #                     occ = parts[0].split(":")[1].strip()
# #                     avail = parts[1].split(":")[1].strip()

# #                     latest_data["occupied"] = int(occ)
# #                     latest_data["available"] = int(avail)
# #         except:
# #             pass

# # # Start reading thread
# # threading.Thread(target=read_serial, daemon=True).start()

# # @app.route("/data")
# # def get_data():
# #     return jsonify(latest_data)

# # @app.route("/")
# # def home():
# #     return render_template("index.html")

# # if __name__ == "__main__":
# #     app.run(debug=False)


# from flask import Flask, jsonify, render_template
# import serial
# import serial.tools.list_ports
# import threading

# app = Flask(__name__)

# # 🔹 Automatically detect Arduino port (optional)
# def find_arduino():
#     ports = list(serial.tools.list_ports.comports())
#     for p in ports:
#         if "Arduino" in p.description:
#             return p.device
#     return None

# # Set your Arduino port here if auto-detect fails
# PORT = "COM3"  
# print(f"Using Arduino on {PORT}")

# BAUD_RATE = 9600

# # Serial connection
# try:
#     ser = serial.Serial(PORT, BAUD_RATE, timeout=1)
#     print(f"Connected to Arduino on {PORT}")
# except Exception as e:
#     print("Failed to connect to Arduino:", e)
#     exit()

# # Store latest parking data
# latest_data = {
#     "total_available": 4,
#     "slots": [0, 0, 0, 0]  # initial state: all free
# }

# # 🔁 Background thread to read Arduino continuously
# def read_serial():
#     global latest_data
#     while True:
#         try:
#             if ser.in_waiting:
#                 line = ser.readline().decode("utf-8").strip()
#                 print("Received:", line)  # Debug print

#                 # Example Arduino line: TOTAL_AVAILABLE:2,S1:0,S2:1,S3:0,S4:0
#                 if line.startswith("TOTAL_AVAILABLE"):
#                     parts = line.split(",")
#                     total = int(parts[0].split(":")[1])
#                     s1 = int(parts[1].split(":")[1])
#                     s2 = int(parts[2].split(":")[1])
#                     s3 = int(parts[3].split(":")[1])
#                     s4 = int(parts[4].split(":")[1])

#                     latest_data = {
#                         "total_available": total,
#                         "slots": [s1, s2, s3, s4]
#                     }

#         except Exception as e:
#             print("Error parsing serial:", e)

# # Start reading thread
# threading.Thread(target=read_serial, daemon=True).start()

# @app.route("/data")
# def get_data():
#     return jsonify(latest_data)

# @app.route("/")
# def home():
#     return render_template("index.html")

# if __name__ == "__main__":
#     app.run(debug=False)
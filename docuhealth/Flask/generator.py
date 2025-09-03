# from flask import Flask, request, jsonify
# from flask_cors import CORS

# import json
# import qrcode


# # https://docs.google.com/forms/d/e/1FAIpQLSdiPZGbKxWmA6eByq_T5onCe0kW3Ueon-3QgqII6ODHhJTK-Q/viewform?usp=pp_url&entry.653749192=Srijan+Pandey&entry.1896956791=20&entry.1828253941=Male&entry.472268035=8776655443&entry.1678012848=Hostel+10B

base_url="https://docs.google.com/forms/d/e/1FAIpQLSdiPZGbKxWmA6eByq_T5onCe0kW3Ueon-3QgqII6ODHhJTK-Q/viewform?usp=pp_url"

# app = Flask(__name__)
#   # Allows React to connect
# CORS(app, origins="http://localhost:5173")

# @app.after_request
# def add_cors_headers(response):
#     response.headers['Access-Control-Allow-Origin'] = '*'
#     response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
#     response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
#     return response




# @app.route('/submit', methods=['POST'])
# def handle_form():
#     data = request.get_json()
#     # data = json.loads(response)

#     if not data:
#         return jsonify({"error": "No data recieved"}),400
    
#     print(data)
#     print("\n")

#     name = data.get("name")
#     age = data.get("age")
#     gender = data.get("gender")
#     contact = data.get("contact")
#     address = data.get("address")


#     details_url = f"&entry.653749192={name.replace(' ','+')}&entry.1896956791={age}&entry.1828253941={gender}&entry.472268035={contact}&entry.1678012848={address.replace(' ','+')}"

#     qr = qrcode.make(details_url)
#     qr.save(rf"D:\PBL-Proj\MedicalSys\Resources\QRs\{name}_qr.png")

    

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)  # Runs on port 5000
from flask import Flask, request, jsonify
from flask_cors import CORS
import qrcode

app = Flask(__name__)

# CORS configuration for the server
# CORS(app, origins=["hhttp://127.0.0.1:5000/submit"])  # Adjust for your React app's URL
CORS(app)

@app.route('/submit', methods=['OPTIONS'])
def handle_options():
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

@app.route('/submit', methods=['POST'])
def handle_form():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data received"}), 400
    
    print(data)
    
    name = data.get("name")
    age = data.get("age")
    gender = data.get("gender")
    contact = data.get("contact")
    address = data.get("address")

    details_url = f"&entry.653749192={name.replace(' ','+')}&entry.1896956791={age}&entry.1828253941={gender}&entry.472268035={contact}&entry.1678012848={address.replace(' ','+')}"
    url=base_url+details_url
    qr = qrcode.make(url)
    qr.save(rf"D:\PBL-Proj\MedicalSys\Resources\QRs\{name}_qr.png")

    return jsonify({"message": "QR code created successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)

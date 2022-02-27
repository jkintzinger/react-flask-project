import os
from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, request
from dataclasses import dataclass
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

FRONTEND_URL = os.getenv("FRONTEND_URL")

#origin_allowed = ["http://localhost:3000"]

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inputs.sqlite3'

db = SQLAlchemy(app)

@dataclass
class inputModel(db.Model):
  _id: int
  input_data: str
  date: int

  _id = db.Column(db.Integer, primary_key=True)
  input_data = db.Column(db.String(500))
  date = db.Column(db.Integer)


@app.route('/retrieveData', methods=['POST'])
@cross_origin(origin=FRONTEND_URL,headers=['Content- Type'])
def get_data():
  output_data = []
  filters = request.json['filters']
  date_from = filters['dateInterval']['from']
  date_to = filters['dateInterval']['to']
  if date_from == None or date_to == None:
    output_data = inputModel.query.all()
  else:
    output_data = inputModel.query.filter(inputModel.date >= date_from, inputModel.date <= date_to).all()
  return jsonify(output_data)


@app.route('/uploadData', methods=['POST'])
@cross_origin(origin=FRONTEND_URL,headers=['Content- Type'])
def upload_data():
  input_data = request.json['input']
  date_data = request.json['date']
  new_db_data = inputModel(input_data=input_data, date=date_data)
  db.session.add(new_db_data)
  db.session.commit()
  return jsonify({'_id':new_db_data._id})


if __name__ == "__main__":
  db.create_all()
  app.run(debug=True)

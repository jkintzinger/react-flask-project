from flask import Flask, jsonify, request
from dataclasses import dataclass
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

import time

origin_allowed = ["http://localhost:3000"]

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inputs.sqlite3'

db = SQLAlchemy(app)

@dataclass
class inputModel(db.Model):
  _id: int
  input_data: str
  date: int

  _id = db.Column(db.Integer, primary_key=True, auto_increment=True)
  input_data = db.Column(db.String(500))
  date = db.Column(db.Integer)



@app.route('/data', methods=['GET','POST'])
@cross_origin(origin=origin_allowed,headers=['Content- Type'])
def get_data():
  #GET method
  if request.method == 'GET':
    all_data = inputModel.query.all()
    return jsonify(all_data)
  #POST method
  elif request.method == 'POST':
    input_data = request.json['input']
    date_data = request.json['date']
    new_db_data = inputModel(input_data=input_data, date=date_data)
    db.session.add(new_db_data)
    db.session.commit()
    all_data = inputModel.query.all()
    return jsonify(all_data)
  #Not implemented methods
  else:
    return {'info': 'Not implemented yet'}



if __name__ == "__main__":
  db.create_all()
  app.run(debug=True)

<p align="center">
  <h3 align="center">Input storage - server</h3>
</p>

## Build with

* [Python 3.7+](https://www.python.org/) (version tested: 3.7.7 - 3.9.6)
* [Flask 2.0](https://flask.palletsprojects.com/en/2.0.x/)
* [SQLAlchemy 1.4](https://www.sqlalchemy.org/)

## Installation


1. Acces the project folder

```sh
cd <path-to-git-folder>/server
```

2. Create and activate a virtual environment. 

```sh
python -m venv venv

source venv/bin/activate #LINUX

venv\Scripts\activate #WINDOWS
```

3. Install requirements 

```sh
pip install -r requirements.txt
```

4. Set up your .env file by using .env.example

```sh
cp .env.example .env #LINUX

copy .env.example .env #WINDOWS
```


## Usage

To launch the server, simply do the following

```sh
python server.py 
```


## Deployment

Not implemented yet.

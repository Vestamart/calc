from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////app/data/db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
app.secret_key = "secret"


app.app_context().push()
#Капитальные расходы таблица
class capitalcost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    price = db.Column(db.Integer)
    amount = db.Column(db.Integer)
    cost = db.Column(db.Integer)
    
    def __init__(self,name,price,amount,cost):
        self.name = name
        self.price = price
        self.amount = amount
        self.cost = cost

#Постоянные расходы таблица
class fixedcost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    price = db.Column(db.Integer)
    amount = db.Column(db.Integer)
    cost = db.Column(db.Integer)
    month = db.Column(db.Integer)

    
    def __init__(self,name,price,amount,cost, month):
        self.name = name
        self.price = price
        self.amount = amount
        self.cost = cost
        self.month = month


#Переменные расходы таблица
class variblecost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    price = db.Column(db.Integer)
    amount = db.Column(db.Integer)
    cost = db.Column(db.Integer)
    month = db.Column(db.Integer)
    
    #Инициализация
    def __init__(self,name,price,amount,cost, month):
        self.name = name
        self.price = price
        self.amount = amount
        self.cost = cost
        self.month = month
        

#Результат таблица
class result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    totalcost = db.Column(db.Integer)
    month = db.Column(db.Integer)

    def __init__(self,name,totalcost,month):
        self.name = name
        self.totalcost = totalcost
        self.month = month
    
    def serialize(self):
        return {
            'id': self.id, 
            'name': self.name,
            'totalcost': self.totalcost,
            'month': self.month
        }
    
@app.before_first_request
def create_tables():
    db.create_all()
    
#Сериализатор
class ItemSchema(ma.Schema):
    class Meta:
        fields = ('id','name','price','amount','cost', 'month','totalcost')
        

item_schema = ItemSchema()
items_schema = ItemSchema(many=True)



#GET всех элементов (Получение)
@app.route('/<name_table>/get', methods=['GET'])
def get_items(name_table):
    if name_table == 'capitalcost':
        items = capitalcost.query.all()
        results = items_schema.dump(items)
        return jsonify(results)
    elif name_table == 'fixedcost':
        items = fixedcost.query.all()
        results = items_schema.dump(items)
        return jsonify(results)
    elif name_table == 'variblecost': 
        items = variblecost.query.all()
        results = items_schema.dump(items)
        return jsonify(results)
    elif name_table == 'result':
        items = result.query.all()
        results = items_schema.dump(items)
        return jsonify(results)

#GET определенного элемента
# if name_table == 'capitalcost':
# elif name_table == 'fixedcost':
# elif name_table == 'variblecost':


#POST (Добавление)
@app.route('/<name_table>/add', methods=['POST'])
def add_item(name_table):
    if name_table == 'capitalcost':
        name = request.json['name']
        price = request.json['price']
        amount = request.json['amount']
        cost = request.json['cost']
        
        item = capitalcost(name,price,amount,cost)
        db.session.add(item)
        db.session.commit()
        return item_schema.jsonify(item)
    elif name_table == 'fixedcost':
        name = request.json['name']
        price = request.json['price']
        amount = request.json['amount']
        cost = request.json['cost']
        month = request.json['month']
        
        item = fixedcost(name,price,amount,cost, month)
        db.session.add(item)
        db.session.commit()
        return item_schema.jsonify(item)
    elif name_table == 'variblecost':
        name = request.json['name']
        price = request.json['price']
        amount = request.json['amount']
        cost = request.json['cost']
        month = request.json['month']
        
        item = variblecost(name,price,amount,cost, month)
        db.session.add(item)
        db.session.commit()
        return item_schema.jsonify(item)
    elif name_table == 'result':
        name = request.json['name']
        totalcost = request.json['totalcost']
        month = request.json['month']

        item = result(name,totalcost,month)
        db.session.add(item)
        db.session.commit()
        return item_schema.jsonify(item)

#PUT (Изменение)
@app.route('/<name_table>/edit/<id>', methods=['PUT'])
def edit_item(name_table,id):
    if name_table == 'capitalcost':
        item = capitalcost.query.get(id)
        
        name = request.json['name']
        price = request.json['price']
        amount = request.json['amount']
        cost = request.json['cost']
        
        item.name = name
        item.price = price
        item.amount = amount
        item.cost = cost
        
        db.session.commit()
        return item_schema.jsonify(item)
    elif name_table == 'fixedcost':
        item = fixedcost.query.get(id)
        
        name = request.json['name']
        price = request.json['price']
        amount = request.json['amount']
        cost = request.json['cost']
        month = request.json['month']

        item.name = name
        item.price = price
        item.amount = amount
        item.cost = cost
        item.month = month
                
        db.session.commit()
        return item_schema.jsonify(item)
    elif name_table == 'variblecost':
        item = variblecost.query.get(id)
        
        name = request.json['name']
        price = request.json['price']
        amount = request.json['amount']
        cost = request.json['cost']
        month = request.json['month']
        
        item.name = name
        item.price = price
        item.amount = amount
        item.cost = cost
        item.month = month
                
        db.session.commit()
        return item_schema.jsonify(item)




#Delete (Удаление)
@app.route('/<name_table>/delete/<id>', methods=['DELETE'])
def delete_item(name_table,id):
    if name_table == 'capitalcost':
        item = capitalcost.query.get(id)
        
        db.session.delete(item)
        db.session.commit()
        return item_schema.jsonify(item)
    elif name_table == 'fixedcost':
        item = fixedcost.query.get(id)
        
        db.session.delete(item)
        db.session.commit()
        return item_schema.jsonify(item)
    elif name_table == 'variblecost':
        item = variblecost.query.get(id)

        db.session.delete(item)        
        db.session.commit()
        return item_schema.jsonify(item)

@app.route('/result/delete', methods=['DELETE'])
def check():
    duplicates = db.session.query(result).group_by(result.month, result.name).having(db.func.count() > 1).all()
    deleted_items = []

    for duplicate in duplicates:
        deleted_items.append(duplicate)
        db.session.delete(duplicate)
        
    db.session.commit()
    return item_schema.jsonify({'deleted_items': [item.serialize() for item in deleted_items]})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
from flask import Flask, render_template

app = Flask(__name__)

PRODUCTS = [
    {"id": 1, "name": "Produto A", "category": "Destaques", "price": 12.90, "description": "Produto demonstrativo do catálogo.", "image": "https://placehold.co/600x400?text=Produto+A"},
    {"id": 2, "name": "Produto B", "category": "Destaques", "price": 18.90, "description": "Produto demonstrativo do catálogo.", "image": "https://placehold.co/600x400?text=Produto+B"},
    {"id": 3, "name": "Produto C", "category": "Acessórios", "price": 24.90, "description": "Produto demonstrativo do catálogo.", "image": "https://placehold.co/600x400?text=Produto+C"},
    {"id": 4, "name": "Produto D", "category": "Acessórios", "price": 32.90, "description": "Produto demonstrativo do catálogo.", "image": "https://placehold.co/600x400?text=Produto+D"},
    {"id": 5, "name": "Produto E", "category": "Kits", "price": 39.90, "description": "Produto demonstrativo do catálogo.", "image": "https://placehold.co/600x400?text=Produto+E"},
    {"id": 6, "name": "Produto F", "category": "Kits", "price": 49.90, "description": "Produto demonstrativo do catálogo.", "image": "https://placehold.co/600x400?text=Produto+F"},
]

@app.route("/")
def index():
    return render_template("index.html", products=PRODUCTS)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

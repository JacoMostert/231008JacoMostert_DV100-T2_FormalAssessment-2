class SmoothieOrder {
  constructor() {
    this.smoothieName = document.getElementById('smoothie');
    this.smoothieSize = document.querySelectorAll('input[name="baseRadio"]');
    this.ingredients = document.querySelectorAll('input[name="ingredients"]');
    this.smoothieOrderCard = document.querySelector('#studentOut .card-body');
    
    this.attachEventListeners();
  }
  
  attachEventListeners() {
    const makeSmoothieButton = document.querySelector('button');
    makeSmoothieButton.addEventListener('click', () => this.makeSmoothieOrder());
  }
  
  makeSmoothieOrder() {
    const selectedSize = this.getSelectedSize();
    const selectedIngredients = this.getSelectedIngredients();
    
    const smoothieNameValue = this.smoothieName.value;
    const smoothieSizeValue = selectedSize ? selectedSize.value : '';
    const ingredientNames = selectedIngredients.map(ingredient => ingredient.value);
    const totalCost = this.calculateTotalCost(selectedSize, selectedIngredients);
    
    this.updateSmoothieOrderCard(smoothieNameValue, smoothieSizeValue, ingredientNames, totalCost);

    const smoothieOrder = {
      name: smoothieNameValue,
      size: smoothieSizeValue,
      ingredients: ingredientNames,
      cost: totalCost
    };
    localStorage.setItem('smoothieOrder', JSON.stringify(smoothieOrder));
    
    this.resetForm();
  }
  
  resetForm() {
    this.smoothieName.value = '';
    this.smoothieSize.forEach(size => (size.checked = false));
    this.ingredients.forEach(ingredient => (ingredient.checked = false));
  }
  
  getSelectedSize() {
    return Array.from(this.smoothieSize).find(size => size.checked);
  }
  
  getSelectedIngredients() {
    return Array.from(this.ingredients).filter(ingredient => ingredient.checked);
  }
  
  calculateTotalCost(size, ingredients) {
    const sizeCost = size ? parseInt(size.getAttribute('data-cost')) : 0;
    const ingredientCost = ingredients.reduce((total, ingredient) => total + parseInt(ingredient.getAttribute('data-cost')), 0);
    return sizeCost + ingredientCost;
  }
  
  updateSmoothieOrderCard(smoothieName, smoothieSize, ingredientNames, totalCost) {
    this.smoothieOrderCard.innerHTML = `
      <h5 class="card-title">${smoothieName}</h5>
      <p>Size: ${smoothieSize}</p>
      <p>Ingredients: ${ingredientNames.join(', ')}</p>
      <p>Total Cost: R${totalCost}</p>
    `;
  }
}

window.onload = function() {
  const smoothieOrder = new SmoothieOrder();
  loadSmoothieOrderFromStorage();
};

function loadSmoothieOrderFromStorage() {
  const smoothieOrderJSON = localStorage.getItem('smoothieOrder');
  if (smoothieOrderJSON) {
    const smoothieOrder = JSON.parse(smoothieOrderJSON);
    const smoothieOrderCard = document.querySelector('#studentOut .card-body');
    const smoothieOrderHTML = `
      <h5 class="card-title">${smoothieOrder.name}</h5>
      <p>Size: ${smoothieOrder.size}</p>
      <p>Ingredients: ${smoothieOrder.ingredients.join(', ')}</p>
      <p>Total Cost: R${smoothieOrder.cost}</p>
    `;
    smoothieOrderCard.innerHTML = smoothieOrderHTML;
  }
}
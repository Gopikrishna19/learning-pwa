const generateCard = car => {

  const template = document.getElementById('car-card');
  const clone = document.importNode(template.content, true);

  clone.querySelector('.car-card').style.backgroundImage = `url(${car.image})`;
  clone.querySelector('.title').innerHTML = `${car.brand} ${car.model} ${car.year}`;
  clone.querySelector('.price').innerHTML = `$${car.price}`;

  return clone;

};

export const getNodes = (...cars) => cars.reduce(
  (node, car) =>
    node.concat(generateCard(car.value)),
  []
);

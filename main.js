const map = document.body.getElementsByClassName("axis-map")[0];

//константа шага на будущее
const step = 50;

document.body.querySelector('.axis-map').addEventListener('dblclick', createPoint)

//создание точки на графике
function createPoint(event){
  const map = document.body.querySelector('.axis-map');
  const point = document.createElement('div');
  const countPoints = document.body.getElementsByClassName('points');
  point.className = `point${countPoints.length} points`
  const mainPoint = getMainPointCoords(map);
  point.style.left = event.pageX - mainPoint.left + 'px';
  point.style.top = event.pageY - mainPoint.top + 'px';
  map.append(point);
  createRow({name: point.className.split(' ')[0], x: point.style.left, y: point.style.top})
}

//создание строки в таблице
function createRow(point){
  const tbody = document.body.querySelector('.tbody-class');
  const tr = document.createElement('tr');
  tr.className = point.name;
  tr.innerHTML = `<td class="td-class">${point.name}</td>
                  <td class="td-class">${(point.x.split('px')[0]/500 * 10).toFixed(2)}</td>
                  <td class="td-class" >${Math.abs(point.y.split('px')[0]/500 * 10 - 10).toFixed(2)}</td>
                  <td><button class="delete ${point.name}">X</button></td>`;
  tr.addEventListener('click', deletePoint);
  tbody.appendChild(tr);
}

//удаление точки с графика и из таблицы
function deletePoint(e){
  console.log(e.target.className.split(' ')[1]);
  const map = document.body.querySelector('.axis-map');
  const mapPoint = map.querySelector(`.${e.target.className.split(' ')[1]}`);
  const tbody = document.body.querySelector('.tbody-class');
  const bodyPoint =tbody.querySelector(`.${e.target.className.split(' ')[1]}`);
  if (mapPoint.parentNode){
    mapPoint.parentNode.removeChild(mapPoint);
  }
  if (bodyPoint.parentNode){
    bodyPoint.parentNode.removeChild(bodyPoint);
  }
  //map.removeChild(pointMap);
  //tbody.removeChild(pointBody);
};

//addEventListener('mousemove', pos, false); //потом для красивого эффекта мышки

//получение значений начала координат на графике
function getMainPointCoords(elem) {
    let box = elem.getBoundingClientRect();
    const mainPoint = {
          top: box.top + window.pageYOffset,
          right: box.right + window.pageXOffset,
          bottom: box.bottom + window.pageYOffset,
          left: box.left + window.pageXOffset
        };
    const mainPoint2 = {
        x: box.left + window.pageXOffset,
        y: box.bottom + window.pageYOffset,
    }
    console.log(mainPoint);
    return mainPoint;
  }

//const mainPoint = getMainPointCoords(map);
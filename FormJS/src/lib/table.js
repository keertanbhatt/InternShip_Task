export default class Table {
  constructor(TableContainer) {
    this.container = document.getElementById(TableContainer);
    let id;
    let obj = {};
    this.table = document.createElement('table');

    const _events = {};
    this.on = function (name, callback) {
      if (!_events[name]) {
        _events[name] = [callback];
      } else {
        _events[name].push(callback);
      }
    };

    this.addRows = (data, labels) => {
      const row = document.createElement('tr');
      labels.forEach((header) => {
        const cell = document.createElement('td');
        cell.setAttribute('id', header.key);
        // Check if the header key is 'createdAt' and format the date
    if (header.key === 'createdAt' && data[header.key]) {
      const createdAtDate = new Date(data[header.key]);
      const formattedDate = `${createdAtDate.getDate()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getFullYear()}`;
      const cellText = document.createTextNode(formattedDate);
      cell.appendChild(cellText);
    } else {
      const CellTest = document.createTextNode(data[header.key]);
      cell.appendChild(CellTest);
    }

        row.appendChild(cell);
      });
      const cell1 = document.createElement('td');
      const buttons = ['update', 'delete'];
      buttons.forEach((btn) => {
        const button = document.createElement('input');
        button.setAttribute('type', 'button');
        const string = btn.charAt(0).toUpperCase() + btn.slice(1);
        button.setAttribute('value', string);
        button.setAttribute('id', btn);
        cell1.appendChild(button);
        if (btn === 'update') {
          button.onclick = () => {
            id = data.userId;
            obj = data;
            _events['update'].forEach((value) => value());
          };
        } else if (btn === 'delete') {
          button.onclick = () => {
            id = data.userId;
            _events['delete'].forEach((value) => value());
            this.table.removeChild(row);
          };
        }
      });
      row.appendChild(cell1);
      this.table.appendChild(row);
      // });
    };
    this.updateRow = (i, object, labels) => {
      console.log('Table Update :', object);
      let index = 0;
      const x = this.table.rows[i].cells;
      labels.forEach((header) => {
        if (header.key === 'createdAt' && object[header.key]) {
          const createdAtDate = new Date(object[header.key]);
          const formattedDate = `${createdAtDate.getDate()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getFullYear()}`;
          x[index].innerHTML = formattedDate;
        } else {
          x[index].innerHTML = object[header.key];
        }
        index++;
      });
    };
    this.getId = () => {
      return id;
    };

    this.getobj = () => {
      return obj;
    };
  }


  createPara(data) {
    this.para = document.createElement('p');
    const text = document.createTextNode('Total Items : ');
    this.val = document.createTextNode(data.length);
    this.para.appendChild(text);
    this.para.appendChild(this.val);
    this.container.appendChild(this.para);
  }

  paraValue(data) {
    this.val.nodeValue = data.length;
  }

  createTable(labels) {
    const row = document.createElement('tr');
    labels.forEach((header) => {
      const cell = document.createElement('th');
      cell.setAttribute('id', header.key);
      const CellTest = document.createTextNode(header.label);
      cell.appendChild(CellTest);
      row.appendChild(cell);
    });
    const cell = document.createElement('th');
    const CellTest = document.createTextNode('Action');
    cell.appendChild(CellTest);
    row.appendChild(cell);
    this.table.appendChild(row);
    this.container.appendChild(this.table);
  }

}

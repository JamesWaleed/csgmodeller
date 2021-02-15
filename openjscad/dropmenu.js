
function updateQuote() {
  var list = document.getElementById('price-list');
  var products = document.querySelectorAll('#mydiv > .parameterstable > div');
  var content = ''
  var total = 0
  console.log('in updateQuote', products);

  const plan = {
    'Transparency:': {
      title: 'Transparency',
      'None': { quote: false },
      'External Walls': { quote: false }
    },
    'Floor Plan:': {
      title: 'Floor Plan',
      'None': { quote: false },
      'Twin single': { quote: true, qty: 1, cost: 5000 },
      'Double': { quote: true, qty: 1, cost: 5500 }
    },
    'Laundry:': {
      title: 'Laundry',
      'None': { quote: false },
      'Outdoor': { quote: true, qty: 1, cost: 1500 }
    },
    'Roof:': {
      title: 'Roof',
      'None': { quote: false },
      'Skillion': { quote: true, qty: 1, cost: 3500 }
    },
    'Electricity:': {
      title: 'Solar',
      'None': { quote: false },
      'Electrical Grid': { quote: true, qty: 1, cost: 1200 },
      'Off-Grid Solar': { quote: true, qty: 6, cost: 3000 }
    },
    'Water:': {
      title: 'Tank',
      'None': { quote: false },
      'Mains Water': { quote: true, qty: 1, cost: 1000 },
      'Off-Grid Water Tank': { quote: true, qty: 2, cost: 4500 }
    },
    'Sewage:': {
      title: 'Sewage',
      'None': { quote: false },
      'Town Sewage': { quote: true, qty: 1, cost: 1800 },
      'Off-Grid Bio': { quote: true, qty: 1, cost: 6400 }
    }
  }

  for(let i = 0; i < products.length; i++) {
    var product = products[i];
    var title = product.firstElementChild.innerHTML;
    var value = product.lastElementChild.firstChild.nextSibling.innerHTML;
    var item = plan[title][value];
    console.log(title, plan[title]);
    if(item.quote == true) {
      content += `<tr><td>${plan[title].title}</td><td>${item.qty}</td><td>${item.cost}</td></tr>`;
      total += item.cost;
    }
  }
  content += `<tr><td>Total</td><td></td><td>${total}</td></tr>`;
  list.innerHTML = content;
}


function makeCustomSelect(that) {
  var x, i, j, selElmnt, a, b, c;
  /*look for any elements with the class "custom-select":*/
  x = document.getElementsByClassName("custom-select");
  console.log('count: x.length=', x.length);
  for (i = 0; i < x.length; i++) {
    
    selElmnt = x[i].getElementsByTagName("select")[0];
    /*for each element, create a new DIV that will act as the selected item:*/
    
    var newFirstElement = document.createElement("option");
    newFirstElement.value = "0";
    newFirstElement.text = "No";
    selElmnt.insertBefore(newFirstElement, selElmnt.firstChild);
    a = document.createElement("DIV");
    
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    
    x[i].appendChild(a);
    
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    
    for (j = 1; j < selElmnt.length; j++) {
      /*for each option in the original select element,
      create a new DIV that will act as an option item:*/
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
          /*when an item is clicked, update the original select box,
          and the selected item:*/

          var y, i, k, s, h;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          h = this.parentNode.previousSibling;
          for (i = 0; i < s.length; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              for (k = 0; k < y.length; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
          if(document.getElementById("instantUpdate").checked==true) {
            that.rebuildSolid();
          }
          
          console.log('before updateQuote');
          updateQuote();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        
        e.stopPropagation();
        closeAllSelect(this);

        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
  }
}

function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);  
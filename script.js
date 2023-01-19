const mainInput = document.querySelector('.input1');
const taskList = document.querySelector('.task-list');
const btnPush = document.querySelector('.push')
const checkAll = document.querySelector('#cat')
const tasksList = document.querySelector('.tasks')
const dac = document.querySelector('#DAC')
const cb = document.getElementById('cat');
const countAll = document.querySelector('.countAll');
const countCompl = document.querySelector('.countCompl');
const countNotCompl = document.querySelector('.countNotCompl');
const btns = document.querySelector('.buttons');

let arrTasks = [];

mainInput.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    btnPush.click()
    // Render(arrTasks)
  }
}
)

btnPush.onclick = () => {
  addTask(mainInput.value, arrTasks)
  mainInput.value = '';
  mainInput.focus();
  Render(arrTasks);
  if (arrTasks.length > 5) {
    selectButton(arrTasks[arrTasks.length - 1].page, arrTasks)
  }
  function selectButton(id, arr) {
    let q;
    arr.forEach((task) => {
      if (task.page == id) {
        q = arr.filter(filter5);
        console.log(q);
      }
    })
    function filter5(task) {
      if (task.page == id) {
        return true;
      }
    }
    Render(q);
  }


  pageButtons(arrTasks)
  function pageButtons(arr) {
    let n = (arr[arr.length - 1].page)
    if ((arr.length % 5) - 1 == 0) {
      btns.innerHTML += `<button class='changer' id='${n}'>${(arr.length / 5) + 0.8}</button>`
    }
  }
}

function addTask(text, arr) {
  const task = {
    id: Date.now(),
    value: text,
    isComplete: false,
    page: (Math.floor((arr.length) / 5)),
  }
  arr.push(task);
}

function pageUpdater() {
  arrTasks.forEach((task) => {
    let i = 0;
    task.page = Math.floor(arrTasks.length[this] / 5)
  })
}

function Render(arr) {
  taskList.innerHTML = '';
  arr.forEach((task) => {
    const cls = task.isComplete ? "task task-complete" : "task";
    const checked = task.isComplete ? "checked" : "";
    taskList.innerHTML += `<li id="${task.id}" class="${cls} ${task.page}">
    <input id="cbone" class="todo-checkbox" type="checkbox" name="cb" ${checked}><input id='qwe' type='text' value='111' hidden><p>${task.value}</p><button class="btn-delete">X</button>
  </li>`
  }
  );
  const isAllComplete = arrTasks.every(arrTasks => {
    return arrTasks.isComplete
  })
  if (isAllComplete == true) {
    cb.checked = 'checked';
  } else {
    cb.checked = '';
  }
  taskCount(arrTasks)

  btns.onclick = (event) => {
    const target = event.target;
    const isButton = target.classList.contains('changer');
    if (isButton) {
      let buttonId = target.getAttribute('id');
      selectButton(buttonId, arrTasks);
    }
  }

  let q;
  function selectButton(id, arr) {
    arr.forEach((task) => {
      if (task.page == id) {
        q = arr.filter(filter5);
        console.log(q);
      }
    })
    function filter5(task) {
      if (task.page == id) {
        return true;
      }
    }
    Render(q);
  }



  // for (let el of document.getElementsByTagName('p')) {
  //   el.onclick = function (e) {
  //     // e.target.innerText
  //     let target = e.target;
  //     elId = el.parentElement.getAttribute('id');
  //     target.innerHTML = `<input type='text' value='${el.innerText}'>`
  //     console.log(elId)
  //   }
  // }
}



taskList.onclick = (event) => {
  const target = event.target;
  const isCheckboxEl = target.classList.contains('todo-checkbox');
  const isDeleteEl = target.classList.contains('btn-delete');
  if (isDeleteEl) {
    const task = target.parentElement;
    const taskId = task.getAttribute("id");
    deleteTask(taskId, arrTasks);
    Render(arrTasks);
  }
  if (isCheckboxEl) {
    const task = target.parentElement;
    const taskId = task.getAttribute('id');
    taskStatus(taskId, arrTasks);
    Render(arrTasks);
  }
}

function deleteTask(id, arr) {
  arr.forEach((task, idx) => {
    if (task.id == id) {
      arr.splice(idx, 1)
    }
  })
  pageUpdater()
}
function taskStatus(id, arr) {
  arr.forEach((task) => {
    if (task.id == id) {
      task.isComplete = !task.isComplete
    }
  })
}

checkAll.onclick = () => {
  completeAll(arrTasks);
  Render(arrTasks);
}

function completeAll(arr) {
  arr.forEach((task) => {
    if (cb.checked) {
      task.isComplete = true;
    }
    else {
      task.isComplete = false;
    }
  })
  // Render(arrTasks)
}

dac.onclick = () => {
  arrTasks = arrTasks.filter(filterByIsComplete)
  Render(arrTasks);
}

function filterByIsComplete(task) {
  if (task.isComplete !== true) {
    return task;
  }
  // return false
}

function allCheckboxStatus() {
  const isAllComplete = arrTasks.every(arrTasks => {
    return arrTasks.isComplete
  })
}

function filterCountComplete(task) {
  if (task.isComplete == true) {
    return task;
  }
}
function filterNotComplete(task) {
  if (task.isComplete !== true) {
    return task;
  }
}
function taskCount(arr) {
  const complArr = arr.filter(filterCountComplete);
  const notComplArr = arr.filter(filterNotComplete);
  countCompl.innerText = `Completed(${complArr.length})`
  countAll.innerText = `All(${arr.length})`
  countNotCompl.innerText = `Not Completed(${notComplArr.length})`
}

+function () {
  function selecPanel(e) {
    // console.dir(e.target.dataset.target)
    const target = e.target;
    const isTabAll = target.classList.contains('countAll')
    const isTabCompl = target.classList.contains('countCompl')
    const isTabNotCompl = target.classList.contains('countNotCompl')
    if (isTabAll) {
      Render(arrTasks)
    }
    if (isTabCompl) {
      const complArr = arrTasks.filter(filterCountComplete);
      Render(complArr);
    }
    if (isTabNotCompl) {
      const notComplArr = arrTasks.filter(filterNotComplete);
      Render(notComplArr);
    }
  }
  document.querySelectorAll('.tab').forEach(el => {
    el.addEventListener('click', selecPanel)
  })

}()
console.log("calender");

var deta = [
  /*{
    date: { d: 01, m: 10, y: 2026 },
    days: null,
    time: { h: 0, m: 0 },
    sound: "",
    msg: "meditation",
    id: 'hsjsbv'
  },*/
]

function update_deta() {
  localStorage.setItem('myappdeta', JSON.stringify(deta))
}

function local_connect() {
  let deta_true = localStorage.getItem('myappdeta')
  if (deta_true) {
    deta = JSON.parse(localStorage.getItem('myappdeta'))
    console.log("deta set setting", deta)
  }
}

local_connect()


let date_p = document.getElementsByClassName("date_p")[0];
let r_month = document.getElementById("r_month");
let r_year = document.getElementById("r_year");
const days7 = [
  'रविवार', // Sunday
  'सोमवार', // Monday
  'मंगलवार', // Tuesday
  'बुधवार', // Wednesday
  'गुरुवार', // Thursday
  'शुक्रवार', // Friday
  'शनिवार' // Saturday
];
let ymonth = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let todaydate = new Date().getDate()
let daydate = todaydate;
let month = new Date().getUTCMonth() + 1;
let year = new Date().getFullYear()
if (daydate < 9 || daydate == 9) { daydate = '0' + daydate }
if (month < 9 || month == 9) { month = '0' + month }
date_p.innerText = daydate + "/" + month + "/" + year;

function update_month(mm, yyyy) {
  mm = mm - 1;
  let display_month = document.getElementById('month');
  display_month.innerHTML = '';
  r_month.innerText = ymonth[mm]
  r_year.innerText = yyyy;
  let dates = new Date(yyyy, mm + 1, 0).getDate();
  let days_war = new Date(yyyy, mm, 1).getDay();
  for (var i = 0; i < days_war; i++) {
    let span = document.createElement('span')
    span.innerText = '';
    display_month.append(span)
  }
  for (var i = 1; i < dates + 1; i++) {
    let span = document.createElement('span')
    if (yyyy == year) {
      if (mm == month - 1) {
        if (i == todaydate) {
          span.classList.add("hoverd");
        }
      }
    }
    
    function date_dot(y, m, d) {
      m = m + 1;
      if (d < 10) {
        d = "0" + d;
      } else {
        d = String(d)
      }
      if (m < 10) {
        m = "0" + m;
      } else {
        m = String(m)
      }
      y = String(y)
      let lenth = datefilter(d, m, y).length;
      if (lenth > 0) {
        span.classList.add("dot");
        //  console.log(y, m, d);
      }
    }
    let day = new Date(yyyy, mm, i).getDay();
    if (day == 0) {
      span.classList.add("Sunday");
    }
    date_dot(yyyy, mm, i)
    span.innerText = i
    display_month.append(span)
  }
  let d = todaydate;
  daylistening()
  //Createdaydeta(d,mm,yyyy);
}
let view_month = 12;
let view_year = 2025;
view_month = new Date().getMonth() + 1;
view_year = new Date().getFullYear();
update_month(view_month, view_year)

function backward() {
  if (view_month == 1) {
    view_month = 12;
    view_year--;
  } else {
    view_month--;
  }
  update_month(view_month, view_year)
}

function forward() {
  if (view_month == 12) {
    view_month = 1;
    view_year++;
  } else {
    view_month++;
  }
  update_month(view_month, view_year)
}

let toddaycontener = document.querySelector(".todayalertmsgcontener")

let daydeta

function Createdaydeta(d, m, y) {
  clear_msgbox_container()
  let day = new Date(y, m - 1, d).getDay();
  if (d < 10) {
    d = "0" + d;
  }
  deta.forEach((e) => {
    if (e.date) {
      if (e.date.d == d) {
        if (e.date.m == m) {
          if (e.date.y == y) {
            create_msgbox(e.msg, 1, e.id)
          }
        }
      }
    }
  })
  deta.forEach((e) => {
    if (e.days) {
      day = String(day);
      if (e.days == day) {
        create_msgbox(e.msg, 1, e.id)
      }
    }
  })
}



function create_msgbox(msg, div_index, note_id) {
  let msgbox_container = document.getElementById("msgbox_container")
  let div = document.createElement("div")
  div.classList.add("msgbox")
  let msg_p = document.createElement("p")
  msg_p.innerText = msg;
  let div2 = document.createElement("div");
  div2.classList.add("change")
  let i = document.createElement("i");
  let i2 = document.createElement("i");
  i.classList.add("fa", "fa-edit");
  i2.classList.add("fa", "fa-trash-o");
  i2.setAttribute('onclick', "remove_note('" + note_id + "')");
  i.setAttribute('onclick', "note_edit('" + note_id + "')");
  div2.append(i, i2)
  div.append(msg_p, div2)
  msgbox_container.append(div)
  if (div_index == 2) {
    msgbox_container = document.getElementById("msgbox_container2")
    msgbox_container.append(div)
  }
  if (div_index == 3) {
    msgbox_container = document.getElementById("msgbox_container3")
    msgbox_container.append(div)
  }
}

//clear_msgbox_container(2)
//create_msgbox("hh", 2)

function clear_msgbox_container(index) {
  document.getElementById("msgbox_container").innerHTML = '';
  if (index == 2) {
    document.getElementById("msgbox_container2").innerHTML = '';
  }
  if (index == 3) {
    document.getElementById("msgbox_container3").innerHTML = '';
  }
}



function daylistening() {
  let display_month_day = Array.from(document.getElementById("month")
    .getElementsByTagName("span"));
  display_month_day.forEach((e) => {
    e.addEventListener('click', () => {
      Createdaydeta(e.innerText, view_month, view_year);
    })
    e.addEventListener('dblclick', () => {
      //divtoggle('not_tab');
      // view_year= toString.apply(view_year)
      //   view_month= toString.apply(view_month)
      // console.log(view_year+'-'+view_month+'-'+e.innerText)
      
    })
  })
}


function notebooks(d_t_d) {
  let notebooks_date_time_type = document.getElementById(
    "notebooks_date_time").value;
  let select_day = document.getElementById(
    "select_day").value;
  let notebooks_msg = document.getElementById("notebooks_msg").value
  let note_id = get_random_id(5);
  if (d_t_d == "days") {
    if (select_day == "") {
      alert('please select day ');
    } else {
      if (notebooks_msg == "") {
        alert('please type notes ');
        return
      } else {
        deta.push({ days: select_day, msg: notebooks_msg,
          id: note_id })
        console.log(deta)
        update_deta()
        alert('set successfull')
      }
      setTimeout(() => {
        local_connect()
        divtoggle('not_tab')
      }, 100)
    }
  }
  
  if (d_t_d == "time") {
    let fulltime = notebooks_date_time_type.split(':');
    if (fulltime == "") {
      alert('please select time ');
    } else {
      if (notebooks_msg == "") {
        alert('please type notes ');
        return
      } else {
        deta.push({
          time: { h: fulltime[0], m: fulltime[1] },
          msg: notebooks_msg,
          id: note_id
        })
        console.log(deta)
        update_deta()
        alert('set successfull')
      }
      setTimeout(() => {
        local_connect()
        divtoggle('not_tab')
      }, 100)
    }
  }
  if (d_t_d == "date") {
    let fulldate = notebooks_date_time_type.split('-');
    let fulldateDD = fulldate[2];
    let fulldateMM = fulldate[1];
    let fulldateYYYY = fulldate[0];
    let msgtext = notebooks_msg;
    if (fulldate == "") {
      alert('date is not set');
    } else {
      if (notebooks_msg == "") {
        alert('please type notes');
        return
      } else {
        deta.push({
          date: {
            d: fulldateDD,
            m: fulldateMM,
            y: fulldateYYYY
          },
          msg: msgtext,
          id: note_id
        });
        console.log(deta)
        update_deta()
        alert('set successfull')
      }
      setTimeout(() => {
        local_connect()
        divtoggle('not_tab')
      }, 100)
    }
  }
  notebook_clear()
}

function inter_deta_change(d_t_d) {
  let notebooks_input_type = document.getElementById(
    "notebooks_date_time")
  let select_day = document.getElementById('select_day');
  let not_tab_save_btn = document.getElementById('not_tab_save_btn');
  
  if (d_t_d == "date") {
    select_day.value = null;
    notebooks_input_type.setAttribute('type', 'date');
    not_tab_save_btn.setAttribute("onclick", "notebooks('date')");
    notebooks_input_type.classList.remove('none');
    select_day.classList.add('none');
  }
  if (d_t_d == "time") {
    select_day.value = null;
    notebooks_input_type.setAttribute('type', 'time');
    not_tab_save_btn.setAttribute("onclick", "notebooks('time')");
    notebooks_input_type.classList.remove('none');
    select_day.classList.add('none');
  }
  if (d_t_d == "days") {
    not_tab_save_btn.setAttribute("onclick", "notebooks('days')");
    notebooks_input_type.value = 0;
    notebooks_input_type.classList.add('none');
    select_day.classList.remove('none');
  }
}

function notebook_clear() {
  document.getElementById("notebooks_date_time").value = "";
  document.getElementById("select_day").value = null;
  document.getElementById("notebooks_msg").value = "";
}


function divtoggle(divid) {
  let a = document.getElementById(divid)
  let decide = " ";
  for (var i = 0; i < a.classList.length; i++) {
    if (a.classList[i] == "none") {
      decide = "none";
    }
  }
  if (decide == "none") {
    a.classList.remove("none")
  } else {
    a.classList.add("none")
  }
}
//divtoggle('not_tab');
//document.getElementById("notebooks_date").setAttribute("value","2023-11-25");


/*for (var i = 0; i < deta.length; i++) {
  create_msgbox(deta[i].msg)
}*/
/*
for (var i = 0; i < deta.length; i++) {
  let p = document.createElement("p");
  p.innerText = deta[i].date.d + "/" + deta[i].date.m + "/" + deta[i]
    .date.y + "  " + deta[i].msg
  document.getElementById('mydetaview').appendChild(p)
}
*/

Createdaydeta(todaydate, month, year)

/*let a= deta.find(deta=>deta.date.d=="15" && deta.date.m=="11");
console.log(a)*/

function datefilter(d, m, y) {
  // Tab to edit
  let newarray = deta.filter(deta => deta.date)
  newarray = newarray.filter(newarray => newarray.date.d == d &&
    newarray.date.m == m && newarray.date.y == y);
  return newarray
}

//console.log(datefilter("05", "10", "2026").length)

function myalldeta_view(type) {
  clear_msgbox_container(2)
  type = type;
  let a
  if (type == 'all') {
    a = deta.filter(deta => deta)
  }
  if (type == 'date') {
    a = deta.filter(deta => deta.date)
  }
  if (type == 'time') {
    a = deta.filter(deta => deta.time)
  }
  if (type == 'days') {
    a = deta.filter(deta => deta.days)
  }
  for (var i = 0; i < a.length; i++) {
    create_msgbox(a[i].msg, 2, a[i].id);
  }
  /*deta.forEach((e)=>{
    if (e.date) {
      create_msgbox("1"+e.msg,2)
    }
    if (e.time) {
      create_msgbox("0"+e.msg, 2)
    }
    if (e.days) {
      create_msgbox("3"+e.msg, 2)
    }
  })*/
}

function remove_note(note_id) {
  let a = confirm("delete this note");
  if (a == true) {
    let id = deta.filter(deta => deta.id !== note_id);
    deta = id;
    update_deta()
  }
}
function note_edit(note_id) {
  let a = confirm("edit this note");
   if (a == true) {
  let new_msg= prompt("type new msg");
  if (!new_msg || new_msg=='') {
    alert('blank not allow');
    return
  }
    let id = deta.filter(deta => deta.id == note_id);
  id[0].msg=new_msg
  update_deta()
  }
}
//remove_note()

function get_random_id(length) {
  let a = ["a", "b", "c", "d", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  ]
  let id = "";
  for (let i = 0; i < length; i++) {
    id += a[Math.floor(Math.random() * a.length)];
  }
  console.log(id)
  return id
}
//get_random_id(5)

function a_link(link) {
  let a = document.createElement('a');
  a.setAttribute('href', link);
  a.click();
}

function search() {
  clear_msgbox_container(3)
  let q = document.getElementById('search_input').value;
  q = q.toLowerCase()
  const filtered = deta.filter(r => r.msg.toLowerCase().includes(q) || r.date.d.toLowerCase().includes(q) || r.date.m.toLowerCase().includes(q) || r.date.y.toLowerCase().includes(q)
  );
  for (var i = 0; i < filtered.length; i++) {
    create_msgbox(filtered[i].msg, 3, filtered[i].id)
  }
if (filtered.length==0) {
    create_msgbox("कोई रिकॉर्ड नहीं मिला", 3);
    console.log(q)
}
}
//search()
function prevAlerts () {
	const BrowserWindow = require('electron').remote.BrowserWindow

	// grab reference to main window
	// let p = BrowserWindow.fromId(0)

	// make this window child of above by adding parent: to ¿constructor?
	// make modal, "modal: true", must have parent
	var win = new BrowserWindow({ width: 800, height: 700, show: false, center: true })

	win.id = 1

	win.loadFile('previous_alerts.html')

	win.once('ready-to-show', () => { win.show() })

	win.on('closed', () => { win = null })

}
  //////////////////////////////////////////////
  //Controlls the tabs at the top of each page//
  //////////////////////////////////////////////
  function switchTabs(evt, tabs) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabs).style.display = "block";
    evt.currentTarget.className += " active";
  }
  ////////////////////////////////////////////
  //sets new page be the default open screen//
  ////////////////////////////////////////////
  document.getElementById("defaultOpen").click();


  ///////////////////////////////////////////////////////
  //When clicked opens add/edit/delete template options//
  ///////////////////////////////////////////////////////
  function popupTemplateAdd() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    var win = new BrowserWindow({
      width: 700,
      height: 525,
      frame: true
    });
    win.setMenuBarVisibility(true);
    win.loadFile('createTemplateMessage.html');
  }

  //////////////////////////////////////////////////////
  //When clicked opens add/edit/delete type options//
  ///////////////////////////////////////////////////////
  function popupTypeAdd() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    var win = new BrowserWindow({
      width: 700,
      height: 450,
      frame: true
    });
    win.setMenuBarVisibility(true);
    win.loadFile('createType.html');
  }
  ///////////////////////////////////////
  //When clicked opens deleted messages//
  ///////////////////////////////////////
  function popupDeleted() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    var win = new BrowserWindow({
      width: 700,
      height: 380,
      frame: false
    });
    win.setMenuBarVisibility(false);
    win.loadFile('deletedMessages.html');
  }
  ///////////////////////////////////////////////
  //Closes window when user click cancel button//
  //////////////////////////////////////////////
  function cancelConfirm() {
    let x = confirm("are you sure you want to cancel?")
    if (x == true) {
      window.close();
      return true;
    }
  }

  //////////////////////////////
  //Clear form. NOT FUNCTIONAL//
  /////////////////////////////
  function resetForm() {
    window.reset();
  }

  /////////////////////////////////////////
  //Are you sure for: Sending new message//
  ////////////////////////////////////////
  function sendConfirm() {
    if (confirm("are you sure you want to send?")) {
      document.getElementById("sendNewMessage").submit()
      document.getElementById("sendNewMessage").reset()
    }
  }

  /////////////////////////////////////////
  //Are you sure for: Making new template//
  /////////////////////////////////////////
  function sendTemplateConfirm() {
    if (confirm("are you sure you want to send?")) {
      document.getElementById("sendNewTemplate").submit()
      document.getElementById("sendNewTemplate").reset()
    }
  }

  /////////////////////////////////////
  //Are you sure for: Making new Type//
  /////////////////////////////////////
  function sendTypeConfirm() {
    if (confirm("are you sure you want to send?")) {
      document.getElementById("sendNewType").submit()
      document.getElementById("sendNewType").reset()
    }
  }

  //////////////////////////////////
  //Are you sure for: Editing type//
  //////////////////////////////////
  function editTypeConfirm() {
    if (confirm("are you sure you want to send?")) {
      document.getElementById("edittype").submit()
      document.getElementById("edittype").reset()
    }
  }

  //////////////////////////////////////
  //Are you sure for: Editing template//
  //////////////////////////////////////
  function editTemplateConfirm() {
    if (confirm("are you sure you want to send?")) {
      document.getElementById("editTemplates").submit()
      document.getElementById("editTemplates").reset()
      console.log("edittemplate sent")
    }
  }

  ////////////////////////////////////////
  //Are you sure for: Deleting Template //
  ////////////////////////////////////////
  function deleteTemplateConfirm() {
    if (confirm("are you sure you want to send?")) {
      document.getElementById("deleteTemplateID").submit()
      document.getElementById("deleteTemplateID").reset()
    }
  }

  function deleteTypeConfirm() {
    if (confirm("are you sure you want to send?")) {
      document.getElementById("deleteTypeID").submit()
      document.getElementById("deleteTypeID").reset()
    }
  }

  ////////////////////////////////////////
  //Grabbing template data from database//
  ////////////////////////////////////////
  const axios = require('axios')

  function getData() {
    const axios = require('axios')
    axios.get("http://localhost:8081/get_templates")
      .then((res) => {

        const messageData = res.data

        let x = document.getElementById("tempSelect");

        for (let i = 0; i < messageData.length; i++) {

          let option = document.createElement("option");
          option.innerHTML = messageData[i].Name;
          option.id = messageData[i].ID


          x.options.add(option)
        }

        //////////////////////////////////////////////////
        //removing all duplicates from template dropdown//
        //////////////////////////////////////////////////

        //window.$ = window.jQuery = require('jquery');

        const options = []

        document.querySelectorAll('#tempSelect > option').forEach((option) => {
          if (options.includes(option.value)) option.remove()
          else options.push(option.value)
        })
      })

    ////////////////////////////////////
    //Grabbing type data from database//
    ////////////////////////////////////
    axios.get("http://localhost:8081/get_types")
      .then((res) => {

        const messageData = res.data

        let x = document.getElementById("MessageTypeID");

        for (let i = 0; i < messageData.length; i++) {
          let option = document.createElement("option");
          option.innerHTML = messageData[i].Name;
          option.value = messageData[i].ID

          x.options.add(option)
        }

        //////////////////////////////////////////
        //Removing duplicates from type dropdown//
        //////////////////////////////////////////

        const options = []
        document.querySelectorAll('#MessageTypeID > option').forEach((option) => {
          if (options.includes(option.value)) option.remove()
          else options.push(option.value)
        })
      })
  }

  /////////////////////////////////////////
  //Autofills form from template dropdown//
  /////////////////////////////////////////

  function fillFormData() {
    axios.get("http://localhost:8081/get_templates")
      .then((res) => {

        let messageData = res.data
        let sel = document.getElementById("tempSelect");

        let messageTitleData = messageData[sel.selectedIndex - 1].Title;
        let messageContentData = messageData[sel.selectedIndex - 1].Content;
        let messageTypeData = messageData[sel.selectedIndex - 1].MessageTypeID;

        document.getElementById("Title").value = messageTitleData;
        document.getElementById("Content").value = messageContentData;
        document.getElementById("MessageTypeID").value = messageTypeData;
      })
  }

  ////////////////////////////////////////
  //Populates type form in edit type tab//
  ////////////////////////////////////////

  function fillEditType() {
    axios.get("http://localhost:8081/get_types")
      .then((res) => {

        let messageData = res.data
        let sel = document.getElementById("MessageTypeID");


        let messageTitleData = messageData[sel.selectedIndex - 1].Color;
        let messageContentData = messageData[sel.selectedIndex - 1].Priority;
        let messageTypeData = messageData[sel.selectedIndex - 1].Name;
        let messageTypeID = messageData[sel.selectedIndex - 1].ID

        document.getElementById("Color").value = messageTitleData;
        document.getElementById("Priority").value = messageContentData;
        document.getElementById("Name").value = messageTypeData;
        document.getElementById("ID").value = messageTypeID;

      
      })
  }


  ////////////////////////////////
  //Autofills data for edit form//
  ////////////////////////////////

  function fillEditFormData() {
    axios.get("http://localhost:8081/get_templates")
      .then((res) => {

        let messageData = res.data
        let sel = document.getElementById("tempSelect");

        let messageTitleData = messageData[sel.selectedIndex - 1].Title;
        let messageContentData = messageData[sel.selectedIndex - 1].Content;
        let messageTypeData = messageData[sel.selectedIndex - 1].MessageTypeID;
        let messageNameData = messageData[sel.selectedIndex - 1].Name
        let messageIdData = messageData[sel.selectedIndex - 1].ID


        document.getElementById("Titles").value = messageTitleData;
        document.getElementById("Contents").value = messageContentData;
        document.getElementById("MessageTypeID").value = messageTypeData;
        document.getElementById("Names").value = messageNameData;
        document.getElementById("ID").value = messageIdData;
      })
  }

  ////////////////////////////////////////////////
  //Populates type dropdown in edit template tab//
  ////////////////////////////////////////////////

  function grabDataForEditTemplateType() {
    axios.get("http://localhost:8081/get_types")
      .then((res) => {

        const messageData = res.data

        let x = document.getElementById("MessageTypeID2");

        for (let i = 0; i < messageData.length; i++) {
          let option = document.createElement("option");
          option.innerHTML = messageData[i].Name;
          option.value = messageData[i].ID


          x.options.add(option)
        }
        const options = []
        document.querySelectorAll('#MessageTypeID2 > option').forEach((option) => {
          if (options.includes(option.value)) option.remove()
          else options.push(option.value)
        })
      })
  }

  function test(){

    const axios = require('axios')
    axios.get("http://localhost:8081/get_templates")
      .then((res) => {

        const messageData = res.data

        let x = document.getElementById("tempSelect2");

        for (let i = 0; i < messageData.length; i++) {

          let option = document.createElement("option");
          option.innerHTML = messageData[i].Name;
          option.id = messageData[i].ID


          x.options.add(option)
        }

        //////////////////////////////////////////////////
        //removing all duplicates from template dropdown//
        //////////////////////////////////////////////////


        const options = []

        document.querySelectorAll('#tempSelect2 > option').forEach((option) => {
          if (options.includes(option.value)) option.remove()
          else options.push(option.value)
        })
      })
  }

  function deleteTypeDropdown() {
    axios.get("http://localhost:8081/get_types")
      .then((res) => {

        const messageData = res.data

        let x = document.getElementById("MessageTypeID3");

        for (let i = 0; i < messageData.length; i++) {
          let option = document.createElement("option");
          option.innerHTML = messageData[i].Name;
          option.value = messageData[i].ID

          x.options.add(option)
        }
        const options = []
        document.querySelectorAll('#MessageTypeID3 > option').forEach((option) => {
          if (options.includes(option.value)) option.remove()
          else options.push(option.value)
        })

      })
  }

  ///////////
  //Polling//
  ///////////

  setInterval(getData, 5000);

// Ignora alerta referente a política
escapeHTMLPolicy = trustedTypes.createPolicy("forceInner", {
  createHTML: (to_escape) => to_escape
})

// Simula cliques 
simulateClick = e => (e.dispatchEvent(new PointerEvent("pointerdown", {
  bubbles: !0
})), e.dispatchEvent(new MouseEvent("mousedown", {
  bubbles: !0
})), e.dispatchEvent(new PointerEvent("pointerup", {
  bubbles: !0
})), e.dispatchEvent(new MouseEvent("mouseup", {
  bubbles: !0
})), e.dispatchEvent(new MouseEvent("mouseout", {
  bubbles: !0
})), e.dispatchEvent(new MouseEvent("click", {
  bubbles: !0
})), !0)

// Deixa o caseID clicável
function replaceCaseId() {
  let textBody = document.querySelector('[data-show-working-location-actions="true"]').parentElement
  if (textBody) {
    let caseId = document.querySelector('[data-show-working-location-actions="true"]').parentElement.innerText.split('caso ')[1].split('\n')[0]
    let cases = `<a href="https://cases.connect.corp.google.com/#/case/${caseId}" target="_blank">${caseId}</a>`
    if (!textBody.innerHTML.includes(cases)) {
      textBody.innerHTML = escapeHTMLPolicy.createHTML(textBody.innerHTML.replaceAll('código ' + caseId, 'código ' + cases))
    }
  }
}

// Verifica se o Connect Appointments está aberto
function checkHidenAppointment() {
  if (!document.querySelector('[aria-label="O conteúdo do complemento é exibido."]')) {
    console.log('Está fechado')
    return true
  }

  else if (document.querySelector('[aria-label="O conteúdo do complemento é exibido."]') && document.querySelector('[aria-label="O conteúdo do complemento é exibido."]').style.display === 'none') {
    console.log('Está fechado')
    return true
  }
  else {
    console.log('Está aberto')
    return false
  }
}

setInterval(replaceCaseId, 500)

// Escutando clique nos slots
document.addEventListener('click', function (e) {
  let mySlot = e.target.closest('[data-opens-details="true"]')
  if (mySlot) {
    let appointmentButton = document.querySelector('[aria-label="Connect Appointments"]')
    if (checkHidenAppointment()) {
      simulateClick(appointmentButton)
    }
  }
})



function checkForm(e, form) {
  if (form.name.value.length < 6) {
    e.preventDefault()
    alert("Error: Debe escribir usuario mas largo!");
    form.name.focus();
    return false;
  }

  if (form.password.value.length < 8) {
    e.preventDefault()
    alert("tu password es muy corta")
    form.password.focus();
    return false;
  }

  if (/(?=.*[0-9])/.test(form.password.value) === false) {
    e.preventDefault()
    alert("tu password debe contener al menos un numero")
    form.password.focus();
    return false;
  }

  return true;
}
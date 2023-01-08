const generarFechaHora = () => {
  const fecha = new Date();
  const fechaStr =
    ("00" + fecha.getDate()).slice(-2) +
    "/" +
    ("00" + (fecha.getMonth() + 1)).slice(-2) +
    "/" +
    fecha.getFullYear() +
    " " +
    ("00" + fecha.getHours()).slice(-2) +
    ":" +
    ("00" + fecha.getMinutes()).slice(-2) +
    ":" +
    ("00" + fecha.getSeconds()).slice(-2);

  return fechaStr;
};

function genericoDTO(object) {
  let fyh = generarFechaHora();
  return {
    ...object,
    fyh,
  };
}

module.exports = { genericoDTO };

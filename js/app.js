document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();

    const integrante = document.getElementById('Integrante').value;
    const Area = document.getElementById('Area').value;

    // Verificar si Evaluadora e Integrante son diferentes de "-Elige una opción-"
    if (integrante === "false") {
        alert('Por favor, seleccione Integrante.');
        return; // Evita que el formulario se envíe
    }

    // Actualizar la fecha después de la validación exitosa
    document.getElementById('Fecha').textContent = obtenerFechaActual();

    const respuesta = await fetch('https://sheetdb.io/api/v1/odv1hdkt9ger6', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Fecha": obtenerFechaActual(),
            "Area": Area,
            "Integrante": integrante,
            "Folio": document.getElementById('Folio').value,
            "Observaciones": document.getElementById('Observaciones').value
        })
    });

    // Manejo de la respuesta...
});

function obtenerFechaActual() {
    const date = new Date();
    const day = agregarCeroAlPrincipio(date.getDate());
    const month = agregarCeroAlPrincipio(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = agregarCeroAlPrincipio(date.getHours());
    const minutes = agregarCeroAlPrincipio(date.getMinutes());

    // Formatear la fecha como "DD/MM/AAAA HH:MM"
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function agregarCeroAlPrincipio(valor) {
    // Agrega un cero al principio si el valor es un solo dígito
    return valor < 10 ? `0${valor}` : valor;
}

// Mostrar la fecha actual en la consola (puedes adaptarlo según tus necesidades)
console.log(obtenerFechaActual());




// Mapa de sectores a códigos
const codigosSector = {
    //GAM
    'Cuautepec': '4901',
    'Ticoman': '4902',
    'Lindavista': '4903',
    'Quiroga': '4904',
    'Pradera': '4905',
    'Tepeyac': '4906',
    'Cuchilla': '4907',
    'Aragon': '4908',
    //VC
    'Consulado': '4926',
    'Moctezuma': '4927',
    'Zaragoza': '4929',
    'Arenal': '4930',
    'Merced-Balbuena': '4931',
    'Congreso': '4988',
    //IZC
    'Iztaccihualtl': '4932',
    'Tlacotal': '4933',
    'Pantitlan': '4934',
    //COY
    'Universidad': '4956',
    'Coyoacan': '4957',
    'Taxqueña': '4958',
    'Xotepingo': '4959',
    'Culhuacan': '4960',
    //MC
    'San Jeronimo': '4961',
    'Dinamo': '4962',
    //TLP
    'Fuente': '4968',
    'Padierna': '4967',
    'Coapa': '4970',
    'Huipulco-Hospitales': '4991',
    //BJ
    'Napoles': '4935',
    'Del Valle': '4936',
    'Narvarte-Alamos': '4937',
    'Portales': '4938',
    'Nativitas': '4939',
    //CUH
    'Tlatelolco': '4918',
    'Morelos': '4920',
    'Revolucion-Alameda': '4922',
    'Roma': '4924',
    'Centro': '4973',
    'Angel-Zona Rosa': '4975',
    'Buenavista': '4993',
    'Asturias': '4994',
    //AZC
    'Hormiga': '4909',
    'Claveria': '4910',
    'Cuitlahuac': '4911',
    'La Raza': '4912',
    //MH
    'Sotelo': '4914',
    'Chapultepec': '4915',
    'Polanco': '4916',
    'Embajadas': '4974',
    'Tacuba': '4992',
    'Tacubaya': '4996',
    //AO
    'Plateros': '4940',
    'Santa Fe': '4941',
    'Alpes': '4942',
    'San Angel': '4943',
    'Cuajimalpa': '4944',
    'El Yaqui': '4945',
    //IZP
    'Churubusco': '4946',
    'Granjas': '4947',
    'Abasto-Reforma': '4948',
    'Santa Cruz': '4950',
    'Oasis': '4951',
    'Estrella': '4952',
    'Teotongo': '4954',
    'Quetzal': '4997',
    'Tezonco': '4998',
    //XOC
    'La Noria': '4965',
    'Tepepan': '4966',
    //TLH
    'Zapotitla': '4963',
    'Mixquic': '4964',
    //MIL
    'Milpa Alta': '4971',
    'Tecomil': '4972',
    //TRANSITO
    'Zona Vial 1': '4631',
    'Zona Vial 2': '4632',
    'Zona Vial 3': '4633',
    'Zona Vial 4': '4634',
    'Zona Vial 5': '4635',
    'Zona Vial 6 Disp. Mov.': '4636',
    'Zona Vial 7 Esta. V.P.': '4637',
    'Zona Vial 8 Parquimetros e Inmov.': '4638',
    //AGRUPAMIENTOS
    'Montada': '4621',
    'UPM Oriente': '4622',
    'UPM Poniente': '4623',
    'Fuerza de Tarea': '4624',
    'GEM': '4625',
    'Ambiental': '4626',
    'Femenil': '4627',
    'Pol. Transporte': '4628',
    'Pol. Turistica': '4748',
    'DUCS': '4745'
};

function calcularISSI() {
  const sectorSelect = document.getElementById('Sector');
  const unidadInput = document.getElementById('No_Unidad');
  const issiInput = document.getElementById('ISSI');

  if (!sectorSelect || !unidadInput || !issiInput) return;

  const sector = sectorSelect.value;
  const unidad = unidadInput.value.trim().toUpperCase();

  // Validar sector
  if (!codigosSector[sector]) {
    issiInput.value = '';
    return;
  }

  // Asegurarse que el prefijo MX- está presente (en vivo)
  let unidadConPrefijo = unidad;
  if (!unidadConPrefijo.startsWith('MX-')) {
    unidadConPrefijo = 'MX-' + unidadConPrefijo;
  }

  // Extraer los primeros 3 dígitos después de MX-
  const match = unidadConPrefijo.match(/^MX-(\d{3})/i);
  if (!match) {
    issiInput.value = '';
    return;
  }

  const codigoSector = codigosSector[sector];
  const numerosUnidad = match[1];
  const issi = `${codigoSector}${numerosUnidad}`;

  issiInput.value = issi;
}

document.addEventListener('DOMContentLoaded', function () {
  const sectorSelect = document.getElementById('Sector');
  const unidadInput = document.getElementById('No_Unidad');

  if (sectorSelect && unidadInput) {
    sectorSelect.addEventListener('change', calcularISSI);
    unidadInput.addEventListener('input', calcularISSI);
  }
});


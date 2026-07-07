document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();

    const Sector = document.getElementById('Sector').value;
    const Tipo = document.getElementById('Tipo').value;

    // Verificar Capos Vacios "-Elige una opción-"
    if (Sector === "false"||Tipo === "false") {
        alert('Por favor, llene los campos obligatorios');
        return; // Evita que el formulario se envíe
    }

    // Validar campos de texto obligatorios
    const Inventario = document.getElementById('Inventario').value.trim();
    const Economico = document.getElementById('Economico').value.trim();
    const TEI = document.getElementById('TEI').value.trim();

    if (!Inventario || !Economico || !TEI) {
        alert('Por favor, complete los campos "Inventario", "Económico" y "TEI".');
        return;
    }


    // Actualizar la fecha después de la validación exitosa
    document.getElementById('Fecha').textContent = obtenerFechaActual();

    const respuesta = await fetch('https://sheetdb.io/api/v1/v4ke1po7azl6t', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Fecha": obtenerFechaActual(),
            "Sector": Sector.toUpperCase(),
            "Tipo": Tipo.toUpperCase(),
            "Inventario": Inventario.toUpperCase(),
            "Economico": formatearEconomico(Economico),
            "ISSI": document.getElementById('ISSI').value.toUpperCase(),
            "TEI": TEI.toUpperCase(),
            "Observaciones": document.getElementById('Observaciones').value.toUpperCase(),
            "Nota": document.getElementById('Nota').value.toUpperCase()
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

function formatearEconomico(valor) {
    valor = valor.trim().toUpperCase();
    return valor.startsWith('MX-') ? valor : 'MX-' + valor;
}

function agregarCeroAlPrincipio(valor) {
    // Agrega un cero al principio si el valor es un solo dígito
    return valor < 10 ? `0${valor}` : valor;
}

// Mostrar la fecha actual en la consola (puedes adaptarlo según tus necesidades)
console.log(obtenerFechaActual());




// Mapa de sectores a códigos
const codigosSector = {
    //UPC
    'ABASTO-REFORMA': '4948',
    'ALPES': '4942',
    'ANGEL-ZONA ROSA': '4975',
    'ARAGON': '4908',
    'ARENAL': '4930',
    'ASTURIAS': '4994',
    'BUENAVISTA': '4993',
    'CENTRO': '4973',
    'CHAPULTEPEC': '4915',
    'CHURUBUSCO': '4946',
    'CLAVERIA': '4910',
    'COAPA': '4970',
    'CONGRESO': '4988',
    'CONSULADO': '4926',
    'COYOACAN': '4957',
    'CUAJIMALPA': '4944',
    'CUAUTEPEC': '4901',
    'CUCHILLA': '4907',
    'CUITLAHUAC': '4911',
    'CULHUACAN': '4960',
    'DEL VALLE': '4936',
    'DINAMO': '4962',
    'EMBAJADAS': '4974',
    'EL YAQUI': '4945',
    'ESTRELLA': '4952',
    'FUENTE': '4968',
    'GRANJAS': '4947',
    'HORMIGA': '4909',
    'HOSPITALES': '4991',
    'IZTACCIHUATL': '4932',
    'LA NORIA': '4965',
    'LA RAZA': '4912',
    'LINDAVISTA': '4903',
    'MERCED-BALBUENA': '4931',
    'MILPA ALTA': '4971',
    'MIXQUIC': '4964',
    'MOCTEZUMA': '4927',
    'MORELOS': '4920',
    'NAPOLES': '4935',
    'NARVARTE-ALAMOS': '4937',
    'NATIVITAS': '4939',
    'OASIS': '4951',
    'PADIERNA': '4967',
    'PANTITLAN': '4934',
    'PLATEROS': '4940',
    'POLANCO': '4916',
    'PORTALES': '4938',
    'PRADERA': '4905',
    'QUETZAL': '4997',
    'QUIROGA': '4904',
    'ALAMEDA-REVOLUCION': '4922',
    'ROMA': '4924',
    'SAN ANGEL': '4943',
    'SAN JERONIMO': '4961',
    'SANTA CRUZ': '4950',
    'SANTA FE': '4941',
    'SOTELO': '4914',
    'TACUBA': '4992',
    'TACUBAYA': '4996',
    'TAXQUEÑA': '4958',
    'TECOMITL': '4972',
    'TEOTONGO': '4954',
    'TEPEPAN': '4966',
    'TEPEYAC': '4906',
    'TEZONCO': '4998',
    'TICOMAN': '4902',
    'TLACOTAL': '4933',
    'TLATELOLCO': '4918',
    'TOPILEJO': '49',
    'UNIVERSIDAD': '4956',
    'XOTEPINGO': '4959',
    'ZAPOTITLA': '4963',
    'ZARAGOZA': '4929',

    'SUBSECRETARIA DE CONTROL DE TRANSITO (ANUBIS)': '',
    'NORMATIVIDAD DE TRANSITO': '',
    'DIRECCION GENERAL DE OPERACION DE TRANSITO': '',
    'DIRECCION GENERAL INGENIERIA DE TRANSITO': '',
    'DISPOSITIVOS FIJOS': '',
    'DISPOSITIVOS MOVILES': '',
    'SUBDIRECCION DE CONTROL TRANSITO': '',
    'ZONA VIAL 1': '4631',
    'ZONA VIAL 2': '4632',
    'ZONA VIAL 3': '4633',
    'ZONA VIAL 4': '4634',
    'ZONA VIAL 5': '4635',
    'ZONA VIAL 7': '4637',
    'ZONA VIAL 8': '4638',

    'SUBSECRETARIA DE SISTEMA PENITENCIARIO (ORCUS)': '',
    'SUBSECRETARIA DE INTELIGENCIA E INVESTIGACION POLICIAL (JAGUAR)': '',
    'DIRECCION GENERAL DE INVESTIGACION DE DELITOS DE MAYOR INCIDENCIA (DRAGONES )': '',
    'DIRECCION EJECUTIVA DE COMUNICACIONES (FALCO)': '',
    'DIRECCION GENERAL ASUNTOS INTERNOS (PRETOR)': '',
    'DIRECCION GENERAL ASUNTOS JURIDICOS': '',
    'DIRECCION GENERAL REGIONAL AOB (JACIEL)': '',
    'DIRECCION GENERAL REGIONAL AZC (MATEO)': '',
    'DIRECCION GENERAL REGIONAL BJ (ABRAHAM)': '',
    'DIRECCION GENERAL REGIONAL COY (PROMETEO)': '',
    'DIRECCION GENERAL REGIONAL CUH (ELISEO)': '',
    'DIRECCION GENERAL REGIONAL CUJ (NOE)': '',
    'DIRECCION GENERAL REGIONAL GAM (XOLOTL)': '',
    'DIRECCION GENERAL REGIONAL IZC ': '',
    'DIRECCION GENERAL REGIONAL IZT (YAAKOV)': '',
    'DIRECCION GENERAL REGIONAL MA (MIGUEL)': '',
    'DIRECCION GENERAL REGIONAL MC (LEONIDAS)': '',
    'DIRECCION GENERAL REGIONAL MH (RAFAEL)': '',
    'DIRECCION GENERAL REGIONAL TLH (URIEL)': '',
    'DIRECCION GENERAL REGIONAL TLP (HELIOS)': '',
    'DIRECCION GENERAL REGIONAL VCA (BALAM)': '',
    'DIRECCION GENERAL REGIONAL XOC (GABRIEL)': '',
    'DIRECCION GENERAL ZONA CENTRO (SANTIAGO)': '',
    'DIRECCION GENERAL ZONA NORTE (QUETZALCOATL)': '',
    'DIRECCION GENERAL ZONA ORIENTE (GLADIADOR)': '',
    'DIRECCION GENERAL ZONA PONIENTE (HERACLES)': '',
    'DIRECCION GENERAL ZONA SUR (DAVID)': '',
    'UNIDAD METROPOLITANA DE OPERACIONES ESPECIALES (UMOE)': '',

    'COORDINACION GENERAL POLICIA METROPOLITANA (OCELOTL)': '',
    'FUERZA DE TAREA (ZORROS)': '4624',
    'GEM (RELAMPAGO)': '4625',
    'POLICÍA DEL TRANSPORTE (MARCO POLO)': '4628',
    'UPM AMBIENTAL (FAUNO)': '4626',
    'UPM FEMENIL (ATENEA)': '4627',
    'UPM MONTADA': '4651',
    'UPM ORIENTE (GUERRERO)': '4622',
    'UPM PONIENTE (CICLON)': '4623',

    'PREVENCION DEL DELITO': '',
    'BRIGADA DE VIGILANCIA ANIMAL (AZOR)': '',
    'DIRECCION EJECUTIVA DE LA POLICIA TURISTICA': '',
    'DGIC INTELIGENCIA ': '',
    'ERUM (ANDOR)': '',
    'CONDORES': '',
    'DIRECCION EJECUTIVA DE LA UNIDAD DE CONTACTO DEL SECRETARIO - UCS (IRIS)': '4745',
    'C2 CENTRO HISTORICO': '',
    'C2 NORTE': '',
    'C2 ORIENTE': '',
    'C2 PONIENTE': '',
    'C2 SUR': ''

};

function calcularISSI() {
  const sectorSelect = document.getElementById('Sector');
  const unidadInput = document.getElementById('Economico');
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
  const unidadInput = document.getElementById('Economico');

  if (sectorSelect && unidadInput) {
    sectorSelect.addEventListener('change', calcularISSI);
    unidadInput.addEventListener('input', calcularISSI);
  }
});


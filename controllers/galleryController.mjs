export class Gallery {
  static async getAll(req, res) {
    try {
      const departments = [
        { departmentId: 1, displayName: "American Decorative Arts" },
        { departmentId: 3, displayName: "Ancient Near Eastern Art" },
        { departmentId: 4, displayName: "Arms and Armor" },
        {
          departmentId: 5,
          displayName: "Arts of Africa, Oceania, and the Americas",
        },
        { departmentId: 6, displayName: "Asian Art" },
        { departmentId: 7, displayName: "The Cloisters" },
        { departmentId: 8, displayName: "The Costume Institute" },
        { departmentId: 9, displayName: "Drawings and Prints" },
        { departmentId: 10, displayName: "Egyptian Art" },
        { departmentId: 11, displayName: "European Paintings" },
        {
          departmentId: 12,
          displayName: "European Sculpture and Decorative Arts",
        },
        { departmentId: 13, displayName: "Greek and Roman Art" },
        { departmentId: 14, displayName: "Islamic Art" },
        { departmentId: 15, displayName: "The Robert Lehman Collection" },
        { departmentId: 16, displayName: "The Libraries" },
        { departmentId: 17, displayName: "Medieval Art" },
        { departmentId: 18, displayName: "Musical Instruments" },
        { departmentId: 19, displayName: "Photographs" },
        { departmentId: 21, displayName: "Modern Art" },
      ];
      
      const  { department, keyword, location } = req.query;
      if(department != undefined || keyword != undefined || location != undefined){

        if(department == undefined){
          department = "";
        }
        if(keyword == undefined){
          keyword = '';
        }
        if(location == undefined){
          location = '';
        }

        const idsFiltrados = await getIdsFiltered(department,keyword,location);
        const objetos = await getObjectDetails(idsFiltrados);


        res.render("gallery/gallery", {
          departments,
          cards: objetos,
        });

      }else{
        // Construir la URL de consulta con parámetros de filtro
        let url ='https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=""';
        const response = await fetch(url);
        const data = await response.json(); //data tiene todos los ids de la url
        const ids = data.objectIDs.slice(0, 100);// Limitar a 100 IDs para no sobrecargar la API
        ids.sort(); 
        const objetos = await getObjectDetails(ids);
        res.render("gallery/gallery", {
          departments,
          cards: objetos,
        });
      }
      

      
    } catch (error) {
      console.error("Error al obtener los datos de la galería:", error);
      res.status(500).send("Hubo un error al cargar la galería.");
    }
  }
}

async function getIdsFiltered(d, k, l) {
  // Empezamos con la URL base
  let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?`;

  // Agregar el departamento si está presente
  if (d) {
    url += `departmentId=${d}&q=""`;
  }

  // Agregar la palabra clave (keyword) si está presente
  if (k) {
    url += `&q=${encodeURIComponent(k)}`;
  }

  // Agregar la localización si está presente
  if (l) {
    url += `geoLocation=${encodeURIComponent(l)}&q=""`;
  }

  // Hacer el fetch con la URL construida
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.objectIDs || data.objectIDs.length === 0) {
      console.log('No se encontraron objetos con los filtros aplicados.');
      return [];
    }

    const ids = data.objectIDs.slice(0, 100); // Limitar a los primeros 100 IDs
    ids.sort();  // Ordenar los IDs si es necesario
    return ids;

  } catch (error) {
    console.error('Error al obtener los IDs:', error);
    return [];
  }
}


/* async function getIdsFiltered(d,k,l){

  let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${k}departmentId=${d}&geoLocation${l}`;
  // /gallery?department=6&keyword=&location=

  const response = await fetch(url);
  const data = await response.json();
  const ids = data.objectIDs.slice(0, 100);
  ids.sort();
  return ids;
}
 */

async function getObjectDetails(objectIDs) {
  const objectDetails = [];

  

  for (let i = 0; i < 20; i++) {
    const objectID = objectIDs[i];
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    );
    const data = await response.json();

    objectDetails.push(data);
  }
  return objectDetails;
}

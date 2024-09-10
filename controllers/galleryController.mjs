import translate from '../services/translate-bridge.cjs';
 
 export class Gallery {
  static async getAll(req, res) {
    try {
      //tengo esto en un array para no hacer mas fetch y hacer todavia mas lenta la pagina :)
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
      
      const { department, keyword, location, lang, page = 1 } = req.query;
      const limit = 20;

      if ( department != undefined || keyword != undefined || location != undefined) {
        if (department == undefined) {
          department = "";
        }
        if (keyword == undefined) {
          keyword = "";
        }
        if (location == undefined) {
          location = "";
        }

        const idsFiltrados = await getIdsFiltered(department,keyword,location);
       
        if (idsFiltrados.length === 0) {
          return res.render("gallery/no-results", {
            message: "No se encontraron objetos con los filtros aplicados.",
            departments,
          });
        } else {
          const objetos = await getObjectDetails(idsFiltrados);

          const translatedCards = await Promise.all(objetos.map(async (obj) => {
            const translatedTitle = await translate({source:'en', text: obj.title, target: lang || 'es' });
            const translatedCulture = await translate({source:'en', text: obj.culture || 'no culture', target: lang || 'es' });
            const translatedDinasty = await translate({source:'en', text: obj.dynasty || 'no dynasty', target: lang || 'es' }); 
            return { ...obj, title: translatedTitle, culture: translatedCulture, dynasty: translatedDinasty };
          }));

          

          res.render("gallery/gallery", {
            departments,
            cards: translatedCards,
          });
        }
      } else {
        let url ='https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=""';
        const response = await fetch(url);
        const data = await response.json(); //data tiene todos los ids de la url
        const ids = data.objectIDs.slice(0, 100); // Limitar a 100 IDs para no sobrecargar la API
        ids.sort();
        const objetos = await getObjectDetails(ids);

        const translatedCards = await Promise.all(objetos.map(async (obj) => {
          const translatedTitle = await translate({source:'en', text: obj.title, target: lang || 'es' });
          const translatedCulture = await translate({source:'en', text: obj.culture || 'no culture', target: lang || 'es' });
          const translatedDinasty = await translate({source:'en', text: obj.dynasty || 'no dynasty', target: lang || 'es' }); 
          return { ...obj, title: translatedTitle, culture: translatedCulture, dynasty: translatedDinasty };
        }));
        console.log(translatedCards)
        res.render("gallery/gallery", {
          departments,
          cards: translatedCards,
        });
      }
    } catch (error) {
      console.error("Error al obtener los datos de la galería:", error);
      res.status(500).send("Hubo un error al cargar la galería.");
    }
  }

  static async getIndividual(req, res) {

    const id = req.params.id;
    
    try {
      const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data) {
        return res.status(404).render('gallery/no-results', {
          message: 'No se encontró el objeto especificado.'
        });
      }

      const translatedTitle = await translate({source:'en', text: data.title, target: req.query.lang || 'es' });
      const translatedDepartment = await translate({source:'en', text: data.department || 'tags no disp', target: req.query.lang || 'es' });
      const translatedObjectName = await translate({source:'en', text: data.objectName || 'tags no disp', target: req.query.lang || 'es' });
      const translatedCulture = await translate({source:'en', text: data.culture || 'tags no disp', target: req.query.lang || 'es' });
      const translatedArtistNationality = await translate({source:'en', text: data.artistNacionality || 'tags no disp', target: req.query.lang || 'es' });  
      data.title = translatedTitle;
      data.department = translatedDepartment;
      data.objectName = translatedObjectName;
      data.culture = translatedCulture;
      data.artistNacionality = translatedArtistNationality;

     res.render("gallery/individual", { card: data });
       
    } catch (error) {
      console.error('Error al obtener los datos del objeto:', error);
      res.status(500).send('Error al cargar el objeto individual.');
    }
    
  }


}

async function getIdsFiltered(d, k, l) {
  let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?`;

  if (d) {
    url += `departmentId=${d}&q=""`;
  }

  if (k) {
    url += `&q=${encodeURIComponent(k)}`;
  }

  if (l) {
    url += `geoLocation=${encodeURIComponent(l)}&q=""`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.objectIDs || data.objectIDs.length === 0) {
      console.log("No se encontraron objetos con los filtros aplicados.");
      return [];
    }else{
      //este es el caso que haya encontrado los filtros aplicados
      const ids = data.objectIDs.slice(0, 100); // Limitar a los primeros 100 IDs
      ids.sort(); // Ordenar los IDs si es necesario
      return ids;

    }

  } catch (error) {
    console.error("Error al obtener los IDs:", error);
    return [];
  }
}

//un saludo al profe que mira los comentarios  
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
 

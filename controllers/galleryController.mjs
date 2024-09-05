

export class Gallery {
  static async getAll(req, res) {
    try {
      const departments = [
        { departmentId: 1, displayName: 'American Decorative Arts' },
        { departmentId: 3, displayName: 'Ancient Near Eastern Art' },
        { departmentId: 4, displayName: 'Arms and Armor' },
        { departmentId: 5, displayName: 'Arts of Africa, Oceania, and the Americas' },
        { departmentId: 6, displayName: 'Asian Art' },
        { departmentId: 7, displayName: 'The Cloisters' },
        { departmentId: 8, displayName: 'The Costume Institute' },
        { departmentId: 9, displayName: 'Drawings and Prints' },
        { departmentId: 10, displayName: 'Egyptian Art' },
        { departmentId: 11, displayName: 'European Paintings' },
        { departmentId: 12, displayName: 'European Sculpture and Decorative Arts' },
        { departmentId: 13, displayName: 'Greek and Roman Art' },
        { departmentId: 14, displayName: 'Islamic Art' },
        { departmentId: 15, displayName: 'The Robert Lehman Collection' },
        { departmentId: 16, displayName: 'The Libraries' },
        { departmentId: 17, displayName: 'Medieval Art' },
        { departmentId: 18, displayName: 'Musical Instruments' },
        { departmentId: 19, displayName: 'Photographs' },
        { departmentId: 21, displayName: 'Modern Art' }
      ];
      const locations = [
        { locationId: 1, locationName: 'Mexico' },
        { locationId: 2, locationName: 'Guatemala' },
        { locationId: 3, locationName: 'United States' },
        { locationId: 4, locationName: 'England' },
        { locationId: 5, locationName: 'Spain' }
      ]

      const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects');
      const data = await response.json();

      


      res.render('gallery/gallery', { departments, locations });
    } catch (error) {
      console.error('Error al obtener los datos de la galería:', error);
      res.status(500).send('Hubo un error al cargar la galería.');
    }
  }
}





/* async function getAllObjectIDs() {
  try {
    // Paso 1: Obtener todos los IDs de los objetos
    const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects');
    const data = await response.json();
    
    // Extraemos los primeros 100 IDs para evitar demasiadas solicitudes
    const objectIDs = data.objectIDs.slice(0, 10000);  // Puedes cambiar el número según sea necesario
    
    return objectIDs;
  } catch (error) {
    console.error('Error al obtener los IDs:', error);
  }
}

async function getCountries() {
  try {
    const objectIDs = await getAllObjectIDs();  // Obtener los IDs de los objetos
    const artworked = new Set();  // Usar un Set para evitar duplicados

    for (const id of objectIDs) {
      // Paso 2: Hacer fetch para cada objeto
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
      const data = await response.json();

      // Verificar si el objeto tiene el campo "country"
      if (data.country) {
        artworked.add(data.country);  // Añadir el país al Set
      }
    }

    // Mostrar todos los países encontrados en la consola
    console.log('Países encontrados:', Array.from(artworked));

  } catch (error) {
    console.error('Error al obtener los países:', error);
  }
}

// Ejecutar la función para obtener y mostrar los países
getCountries(); */
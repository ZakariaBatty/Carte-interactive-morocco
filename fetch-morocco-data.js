import fetch from 'node:fetch';

async function fetchMoroccoData() {
  try {
    const response = await fetch('https://cdn.jsdelivr.net/npm/morocco-map/data/regions.json');
    const data = await response.json();

    console.log('Data structure:');
    console.log(JSON.stringify(data, null, 2).slice(0, 500) + '...');

    console.log('\nObjects in the data:');
    console.log(Object.keys(data.objects));

    console.log('\nNumber of features:');
    console.log(data.objects.regions.geometries.length);

    console.log('\nProperties of the first feature:');
    console.log(data.objects.regions.geometries[0].properties);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchMoroccoData();


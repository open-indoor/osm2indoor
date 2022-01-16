// import _ from 'lodash';
import buffer from '@turf/buffer';
import centroid from '@turf/centroid';

// import numRef from './ref.json';

function osm2imdf(osm_geojson) {
    let imdf = {
        "type": "FeatureCollection",
        "features": []
    }
    for (feature of osm_geojson.features) {
        if (feature.properties == null) {
            continue;
        }
        if (feature.properties.indoor === "room") {
            // Wall fixture
            let wall_category = "wall";
            let wall_name = feature.properties.name !== null ? feature.properties.name : wall_category;
            let wall_alt_name = feature.properties.alt_name !== null ? feature.properties.alt_name : wall_name;
            let wall_anchor_id = feature.id;
            imdf.features.push({
                "type": "Feature",
                "feature_type": "fixture",
                "geometry": buffer(feature, 0.1, { units: 'meters' }).geometry,
                "properties": {
                    "category": wall_category,
                    "name": wall_name,
                    "alt_name": wall_alt_name,
                    "anchor_id": wall_anchor_id,
                }
            });

            // Room unit
            let room_category = "room";
            let room_name = feature.properties.name !== null ? feature.properties.name : room_category;
            let room_alt_name = feature.properties.alt_name !== null ? feature.properties.alt_name : name;
            let room_accessibility = [];
            if (feature.wheelchair === "yes") room_accessibility.push("wheelchair");
            if (feature.tactile_paving === "yes") room_accessibility.push("tactile_paving");
            if (room_accessibility.length === 0) room_accessibility = null;
            imdf.features.push({
                "type": "Feature",
                "id": feature.id,
                "feature_type": "unit",
                "geometry": feature.geometry,
                "properties": {
                    "category": room_category,
                    "name": room_name,
                    "alt_name": room_alt_name,
                    "accessibility": room_accessibility
                }
            });

            // Anchor
            imdf.features.push({
                "type": "Feature",
                "feature_type": "anchor",
                "geometry": centroid(feature).geometry,
                "properties": {
                    "address_id": null,
                    "unit_id": feature.id
                }
            });
        }
    }
    return imdf;
}

// export function numToWord(num) {
//     return _.reduce(
//         numRef,
//         (accum, ref) => {
//             return ref.num === num ? ref.word : accum;
//         },
//         ''
//     );
// }

// export function wordToNum(word) {
//     return _.reduce(
//         numRef,
//         (accum, ref) => {
//             return ref.word === word && word.toLowerCase() ? ref.num : accum;
//         }, -1
//     );
// }

module.exports = osm2imdf;
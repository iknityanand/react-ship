import config from '../config/config';

export default function load(callback) {
    window.gapi.client.load("sheets", "v4", () => {
        window.gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: config.spreadSheetId,
            range: "Sheet1!A1:F"
        }).then(response => {
            const data = response.result.values;
            const parties = data.map(party => ({
                name: party[0],
                abbreviation: party[1],
                foundationYear: party[2],
                currentLeader: party[3],
                statesUT: party[4],
                symbol: party[5]
            })) || [];

            callback(
                {
                    parties
                }
            );

        },
            response => {
                callback(false, response.result.error);
            });

    });

}
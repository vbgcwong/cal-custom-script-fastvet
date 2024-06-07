import axios from "axios";
import { Request, Response } from "express";

async function putStatus() {
  const sugarAuthResponse = await axios.post(`https://sugar.joshcogroup.com/rest/v11_16/oauth2/token`, {
    grant_type: "password",
    client_id: "2LE8XY96EEYTHN5H2A181LHL0YATP6JK9MXYF0WO",
    client_secret: "YXSTMYKVNA40L4X37S4ORKHAA0LAHF5MG1NPLZ5O",
    username: "fastvet",
    password: "$(I217)l76>LE)^eXR}!",
    platform: "FastVet"
  });

  const searchedData = await axios.post(
    `https://sugar.joshcogroup.com/rest/v11_16/Accounts/filter`,
    JSON.stringify({ filter: [{ $and: [{need_vet_check_follow_up_c: true}, {$or: [{ status_c: "recon_sent_to_va" }, { status_c: "file_sent_to_va" }]}] }], "max_num": 100000, fields: ["id"] }),
    {
      headers: {
        Authorization: `Bearer ${sugarAuthResponse.data.access_token}`,
        // Authorization: `Bearer 4057eda2-a0eb-4a6c-b867-dc8e5def2697`,
        "Content-Type": "application/json"
      }
    }
  );

  const docIDs = searchedData.data.records.map((data: { id: any }) => data.id);
  console.log("🚀 ~ file: sugar-search.ts:27 ~ sugarSeach ~ docIDs:", docIDs)

  for (let i = 0; i < docIDs.length; i++) {
    const result = await axios.put(
      `https://sugar.joshcogroup.com/rest/v11_16/Accounts/${docIDs[i]}`,
      {
        need_vet_check_follow_up_c: false
      },
      {
        headers: {
          Authorization: `Bearer ${sugarAuthResponse.data.access_token}`,
          // Authorization: `Bearer 4057eda2-a0eb-4a6c-b867-dc8e5def2697`,
          "Content-Type": "application/json"
        }
      }
    );
    // console.log("🚀 ~ file: sugar-search.ts:42 ~ sugarSeach ~ result:", result)
  }

  return docIDs
}

export const sugarSeach = async (req: Request, res: Response) => {
  // const sugarAuthResponse = await axios.post(`https://sugar.joshcogroup.com/rest/v11_16/oauth2/token`, {
  //   grant_type: "password",
  //   client_id: "2LE8XY96EEYTHN5H2A181LHL0YATP6JK9MXYF0WO",
  //   client_secret: "YXSTMYKVNA40L4X37S4ORKHAA0LAHF5MG1NPLZ5O",
  //   username: "fastvet",
  //   password: "$(I217)l76>LE)^eXR}!",
  //   platform: "FastVet"
  // });

  // const searchedData = await axios.post(
  //   `https://sugar.joshcogroup.com/rest/v11_16/Accounts/filter`,
  //   JSON.stringify({ filter: [{ $and: [{need_vet_check_follow_up_c: true}, {$or: [{ status_c: "recon_sent_to_va" }, { status_c: "file_sent_to_va" }]}] }], "max_num": 100000, fields: ["id"] }),
  //   {
  //     headers: {
  //       Authorization: `Bearer ${sugarAuthResponse.data.access_token}`,
  //       // Authorization: `Bearer 4057eda2-a0eb-4a6c-b867-dc8e5def2697`,
  //       "Content-Type": "application/json"
  //     }
  //   }
  // );

  // const docIDs = searchedData.data.records.map((data: { id: any }) => data.id);
  // console.log("🚀 ~ file: sugar-search.ts:27 ~ sugarSeach ~ docIDs:", docIDs)

  // for (let i = 0; i < docIDs.length; i++) {
  //   const result = await axios.put(
  //     `https://sugar.joshcogroup.com/rest/v11_16/Accounts/${docIDs[i]}`,
  //     {
  //       need_vet_check_follow_up_c: false
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${sugarAuthResponse.data.access_token}`,
  //         // Authorization: `Bearer 4057eda2-a0eb-4a6c-b867-dc8e5def2697`,
  //         "Content-Type": "application/json"
  //       }
  //     }
  //   );
  //   // console.log("🚀 ~ file: sugar-search.ts:42 ~ sugarSeach ~ result:", result)
  // }

  try {
    await putStatus()
  } catch (err) {
    await putStatus()
    console.log("aaa")
    await putStatus()
    await putStatus()
    await putStatus()
    await putStatus()
    await putStatus()
    await putStatus()
    await putStatus()
    await putStatus()
  }

  res.status(200).json({
    ids: "docIDs"
  });
};
// filter: [
//   {
//     $and: [
//       {
//         date_entered: {
//           $gte: "2023-09-14"
//         }
//       }
//     ]
//   }
// ],
// fields: ["document_name", "date_entered"],

// "9202cf64-a7d2-11ed-aeba-0269333daa7d",
//   "573effe4-05c7-11ee-a6b3-0269333daa7d",
//   "163d20bc-353c-11ee-b04f-0269333daa7d",
//   "807ac876-bc48-11ec-b999-0269333daa7d",
//   "e7223e1c-a85a-11ec-bce1-0269333daa7d",
//   "701f079c-c83d-11ed-972e-0269333daa7d",
//   "fc92bb84-fb4a-11ed-8900-0269333daa7d",
//   "a3d4e33e-4446-11ed-bd77-0269333daa7d",
//   "e6458586-ca6d-11ed-812c-0269333daa7d",
//   "5df4312a-094f-11ee-8f72-0269333daa7d",
//   "756371aa-b446-11eb-ab48-068d8b4b7195",
//   "e6e49ae8-8c0a-11eb-8a6d-068d8b4b7195",
//   "df3d8b50-1f6b-11ee-b22a-0269333daa7d",
//   "2f5c9740-3d51-11ee-a350-0269333daa7d",
//   "9db84e7e-cf64-11ed-bbdb-0269333daa7d",
//   "afb2b502-e82c-11ed-a076-0269333daa7d",
//   "f3a77760-24aa-11ee-9744-0269333daa7d",
//   "ac49e41e-1471-11ee-b92f-0269333daa7d",
//   "7e88fe5a-2955-11ed-80a9-0269333daa7d",
//   "ecd14af2-3250-11ee-a9b8-0269333daa7d";


// "3a1f7e1a-de04-11ed-a2c8-0269333daa7d",
// "afb2b502-e82c-11ed-a076-0269333daa7d",
// "9202cf64-a7d2-11ed-aeba-0269333daa7d",
// "495a12a8-a774-11ed-bd14-0269333daa7d",
// "573effe4-05c7-11ee-a6b3-0269333daa7d",
// "163d20bc-353c-11ee-b04f-0269333daa7d",
// "807ac876-bc48-11ec-b999-0269333daa7d",
// "e7223e1c-a85a-11ec-bce1-0269333daa7d",
// "701f079c-c83d-11ed-972e-0269333daa7d",
// "fc92bb84-fb4a-11ed-8900-0269333daa7d",
// "a3d4e33e-4446-11ed-bd77-0269333daa7d",
// "e6458586-ca6d-11ed-812c-0269333daa7d",
// "5df4312a-094f-11ee-8f72-0269333daa7d",
// "756371aa-b446-11eb-ab48-068d8b4b7195",
// "e6e49ae8-8c0a-11eb-8a6d-068d8b4b7195",
// "df3d8b50-1f6b-11ee-b22a-0269333daa7d",
// "2f5c9740-3d51-11ee-a350-0269333daa7d",
// "9db84e7e-cf64-11ed-bbdb-0269333daa7d",
// "f3a77760-24aa-11ee-9744-0269333daa7d",
// "ac49e41e-1471-11ee-b92f-0269333daa7d"

// "530ae7c6-ae74-11ed-b1ee-0269333daa7d",
// "ac49e41e-1471-11ee-b92f-0269333daa7d",
// "f3a77760-24aa-11ee-9744-0269333daa7d",
// "9db84e7e-cf64-11ed-bbdb-0269333daa7d",
// "e6e49ae8-8c0a-11eb-8a6d-068d8b4b7195",
// "df3d8b50-1f6b-11ee-b22a-0269333daa7d",
// "2f5c9740-3d51-11ee-a350-0269333daa7d",
// "756371aa-b446-11eb-ab48-068d8b4b7195",
// "e6458586-ca6d-11ed-812c-0269333daa7d",
// "a3d4e33e-4446-11ed-bd77-0269333daa7d",
// "5df4312a-094f-11ee-8f72-0269333daa7d",
// "fc92bb84-fb4a-11ed-8900-0269333daa7d",
// "701f079c-c83d-11ed-972e-0269333daa7d",
// "e7223e1c-a85a-11ec-bce1-0269333daa7d",
// "807ac876-bc48-11ec-b999-0269333daa7d",
// "163d20bc-353c-11ee-b04f-0269333daa7d",
// "573effe4-05c7-11ee-a6b3-0269333daa7d",
// "495a12a8-a774-11ed-bd14-0269333daa7d",
// "9202cf64-a7d2-11ed-aeba-0269333daa7d",
// "3a1f7e1a-de04-11ed-a2c8-0269333daa7d"
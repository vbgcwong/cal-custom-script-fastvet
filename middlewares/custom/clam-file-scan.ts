import NodeClam from "clamscan";
import { NextFunction, Request, Response } from "express";
import { sendBadResponse } from "../../utils/send-bad-response";
import stream from "stream"

const clamScan = new NodeClam().init({
  removeInfected: true,
  quarantineInfected: false,
  scanLog: undefined,
  debugMode: true,
  fileList: undefined,
  scanRecursively: false,
  clamscan: {
    path: "/usr/bin/clamscan"
  },
  clamdscan: {
    host: "34.219.150.172",
    port: 3310,
    timeout: 300000,
    path: "/usr/bin/clamdscan",
    localFallback: false,
    multiscan: true,
    reloadDb: false,
    active: true,
    bypassTest: false
  },
  preference: "clamdscan"
});

export const ClamFileScan = async (req: Request, res: Response, next: NextFunction) => {
  // const Readable = stream.Readable
  // const rs = new Readable({
  //   read() {
      
  //   }
  // })

  // rs.push("req.file?.buffer.toStringbase64")
  // rs.push(req.file?.buffer.toString("base64"))

  // const data = await (await clamScan).scanStream(rs);
  // console.log("🚀 ~ file: clam-file-scan.ts:43 ~ ClamFileScan ~ data:", data)
  // try{
  // const {isInfected, viruses} = await (await clamScan).scanStream(rs);
  // }catch(e){
  //   console.log(e)
  // }
  // next()
  // (await clamScan).isInfected(req.file?.path, (err, file, isInfected, viruses) => {
  //   console.log("🚀 ~ file: clam-file-scan.ts:55 ~ viruses:", viruses)
  //   if (err) return console.error("sdas" + err);

  //   console.log("🚀 ~ file: clam-file-scan.ts:61 ~ isInfected:", isInfected)
  //   if (isInfected) {
  //       console.log(`${file} is infected with ${viruses.join(', ')}.`);
  //   }
  //   next()
  // })
  const data = await (await clamScan).isInfected(req.file?.path);
  console.log("🚀 ~ file: clam-file-scan.ts:55 ~ ClamFileScan ~ data:", data)
  if (data.isInfected) {
    sendBadResponse(res, 418, "File scan detected a potential infected file", "Bad file");
  } else {
    console.log("Clean");
    next();
  }
};

import fp from 'fingerpose';

const Left = new fp.GestureDescription('left');
const Right = new fp.GestureDescription('right');

// for (let finger of [
//   // fp.Finger.Thumb,
//   fp.Finger.Index,
//   // fp.Finger.Middle,
//   // fp.Finger.Ring,
//   // fp.Finger.Pinky,
// ]) {
//   Left.addDirection(finger, fp.FingerDirection.HorizontalLeft, 1);
//   Left.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 1);
//   Right.addDirection(finger, fp.FingerDirection.HorizontalRight, 1);
//   Right.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.8);
// }

// for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
//   Left.addCurl(finger, fp.FingerCurl.FullCurl);
//   Right.addCurl(finger, fp.FingerCurl.FullCurl);
//   Left.addCurl(finger, fp.FingerCurl.HalfCurl);
//   Right.addCurl(finger, fp.FingerCurl.HalfCurl);
// }

// Left.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
// Right.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);

for (let finger of [
  fp.Finger.Index,
  fp.Finger.Middle,
  fp.Finger.Ring,
  fp.Finger.Pinky,
]) {
  Left.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  Right.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}

Left.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
Right.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);

Left.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalLeft, 1.0);
Left.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
Right.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalRight, 1.0);
Right.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);

export { Left, Right };

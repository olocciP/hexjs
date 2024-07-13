(async () => {
  await import("./src/js/hexjs.js"); // window.HEX

  const wh = { w: 1080, h: 1080, c: "#fff" };
  const dev = new HEX.Dev();

  const load = new HEX.Pref.Load({});
  const img = await load.getfile({ src: "./src/img/sample-stamp.png" });

  const cvs = new HEX.Pref.Canvas({
    name: "hex",
    id: "hex",
    type: "2d",
    width: wh.w,
    height: wh.h,
    color: wh.c,
  });
  const ctx = cvs.set();
  cvs.setsize();

  const draw = new HEX.Page.Draw({
    name: "Drawing",
    width: wh.w,
    height: wh.h,
    draws: { type: "L", colors: ["#000000", "#ffffff"], widths: [1, 3, 6, 12] },
    erasers: { type: "L", colors: ["#000000", "#ffffff"], widths: [0, 3, 12] },
    ctx: ctx,
  });

  const setframe = () => {
    draw.setClear({ color: "#384" });
    draw.setimage({ img: img, ps: [50, 50, 550, 450] });
    draw.setline({
      color: "#000",
      width: 3,
      cap: "round",
      join: "round",
      close: false,
      ps: [
        { x: 200, y: 200 },
        { x: 300, y: 200 },
        { x: 300, y: 300 },
      ],
    });
    draw.setline({
      color: "#f00",
      width: 6,
      cap: "round",
      join: "round",
      close: true,
      fill: "#640",
      ps: [
        { x: 400, y: 400 },
        { x: 500, y: 400 },
        { x: 500, y: 500 },
        { x: 400, y: 500 },
      ],
    });

    window.requestAnimationFrame(setframe);
  };
  window.requestAnimationFrame(setframe);
})();

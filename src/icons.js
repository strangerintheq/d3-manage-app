module.exports = {
    trash: color => svg(
    rect(-70,-50,140,150, color, 30) +
        rect(-90,-70,180,50, color, 30) +
        rect(-20,-100,40,40, color, 20) +
        rect(-50,-40,20,120, 'black', 9)  +
        rect(-10,-40,20,120, 'black', 9)  +
        rect(30,-40,20,120, 'black', 9)
    ),
    download: color =>  svg(path(`m -10 -70 v 100 h30 l -60 60 l -60 -60 h 30 v-100 z`, color)),
};

function svg(content) {
    return `<svg viewBox="-100,-100,200,200" width="30" height="30">${content}</svg>`
}

function rect(x, y, w, h, color, r) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r||0}" fill="${color||'white'}"></rect>`
}

function path(d, fill, stroke) {
    return `<path d="${d}" fill="${fill||'none'}" stroke="${stroke||'none'}"></path>`
}
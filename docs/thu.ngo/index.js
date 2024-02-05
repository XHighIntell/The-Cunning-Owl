var hpny;
(function (hpny) {
    const $root = $('#story');
    const $stars = $('.stars');
    const $moon_container = $root.find('.moon-container');
    const $owl_note = $root.find('.new-year-modal');
    const objects = [];
    for (let i = 0; i < 20; i++) {
        const star = new storyteller.ctrl.Star($stars[0]);
        star.x = Math.random() * window.innerWidth;
        star.y = Math.random() * window.innerHeight;
        objects.push(star);
    }
    const elementMoonContainer = $moon_container[0];
    const moon = new storyteller.ctrl.Moon($moon_container[0]);
    moon.width = 300;
    moon.height = 300;
    let moonAlpha = 0;
    objects.push(moon);
    setInterval(function () {
        if (Math.random() < .5) {
            const comet = new storyteller.ctrl.Comet($root[0]);
            if (Math.random() > .5) {
                comet.x = Math.random() * window.innerWidth;
            }
            else {
                comet.y = Math.random() * window.innerHeight;
            }
            comet.angle = 180 - Math.random() * 90;
            comet.speed = 400;
            comet.width = 200;
            comet.widthIncreasement = 120;
            //comet.headColor = '#0067ff';
            comet.headColor = '#fff';
            objects.push(comet);
        }
        else {
            const comet = new storyteller.ctrl.Comet($root[0]);
            comet.x = Math.random() * window.innerWidth;
            comet.y = Math.random() * window.innerHeight;
            comet.angle = 135;
            comet.speed = 400;
            comet.speedIncreasement = -150;
            comet.width = 200;
            comet.widthIncreasement = -170;
            //comet.headColor = '#0067ff';
            comet.headColor = '#fff';
            objects.push(comet);
        }
    }, 3000);
    document.oncontextmenu = (e) => e.preventDefault();
    $root.on('mouseup', async function (e) {
        console.log(e.button);
        if (e.button == 0) {
            const count = Math.round(7 + Math.random() * 7);
            for (let i = 0; i < count; i++) {
                const firework = new storyteller.ctrl.Fireworks($root[0]);
                firework.x = e.clientX + Math.random() * 300 - 150;
                firework.y = e.clientY + Math.random() * 300 - 150;
                firework.random();
                objects.push(firework);
                await intell.wait(Math.random() * 300);
            }
        }
        else if (e.button == 2) {
        }
    });
    function update() {
        for (var i = 0; i < objects.length; i++) {
            objects[i].update(1 / 60);
            if (objects[i].ended == true) {
                objects.splice(i, 1);
                i--;
            }
        }
        if (moonAlpha < 80) {
            moonAlpha += 0.1;
            let rad = storyteller.degToRad(moonAlpha);
            elementMoonContainer.style.left = 90 * Math.cos(rad) + '%';
            elementMoonContainer.style.top = 100 - 90 * Math.sin(rad) + '%';
            elementMoonContainer.style.transform = 'scale(' + (1.2 - moonAlpha / 80 * 0.7) + ')';
        }
        else {
            moon.element.classList.add('clickable');
        }
        window.requestAnimationFrame(update);
    }
    window.requestAnimationFrame(update);
    moon.element.addEventListener('click', function () {
        if (this.matches('.clickable') == false)
            return;
        $owl_note.toggle();
        $root.find('.new-year-modal video')[0].play();
    });
})(hpny || (hpny = {}));

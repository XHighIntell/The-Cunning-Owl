$(document).ready(() => {
    const qs = intell.qs();
    let a = qs.a ?? '???'; 
    let b = qs.b ?? '???';
    let c = qs.c ?? '???';


    $('.NAME').text(a);
    $('.EMAIL').text(b);
    $('.PHONE').text(c);
});

/*
 
 
 */
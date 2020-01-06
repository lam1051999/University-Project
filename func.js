function layten(s){
    for(let i = s.length - 1 ; i>= 0 ; i--)
    if(s[i] === ' ')
    return s.slice(i+1);
}

module.exports = function addMSSV(s){
    s.sort((a,b) => (layten(a.name) > layten(b.name))?1:-1);
    for(let i = 0 ; i < s.length ; i++)
    {
        s[i].MSSV = 20170000 + i;
    }
    return s;
}


const data =
    `Rincian data sebaran di Desa
,No,Nama Desa,SUSPEK,Terkomfirmasi Covid-19
,Suspek,Discharded,Meninggal,Keterangan,Konfirmasi symptomatik,Konfirmasi Asymptomatik,Konfirmasi Sembuh,Konfirmasi Meninggal,Keterangan
,1,Bejaten,0,0,0,,0,2,14,0,
,2,Bendungan,0,0,0,,0,1,5,0,
,3,Giling,1,0,0,,0,3,20,1,
,4,Glawan,0,1,1,,0,7,31,0,
,5,Jembrak,0,0,0,,0,11,17,1,
,6,Kadirejo,2,1,0,,1,7,26,1,
,7,Karang Gondang,0,0,0,,0,6,9,1,
,8,Kauman lor,0,0,1,,1,11,75,0,
,9,Pabelan,0,1,0,,1,33,140,4,
,10,Padaan,0,0,0,,0,7,89,0,
,11,Segiri,0,0,2,,0,11,20,0,
,12,Semowo,0,3,1,,1,17,76,2,
,13,Sukoharjo,0,2,1,,1,13,32,1,
,14,Sumberejo,0,1,1,,1,42,82,1,
,15,Terban,0,0,0,,0,1,22,1,
,16,Tukang,0,1,0,,0,6,14,1,
,17,Ujung-ujung,0,1,0,,0,27,43,2,
`
lines = data.split("\n");
lines.splice(0, 1)//hapus Rincian data sebaran di Desa (hapus baris 1)

lines[0] = lines[0] + "," + lines[1];//naikin baris 3 ke 2 (sekarang 2 ke 1 setelah splice pertama)
lines.splice(1,1)//hapus baris 2

var firstLine = lines[0].split(",")

firstLine.splice(3,3)

for(var i=0; i<firstLine.length; i++){
    firstLine[i] = firstLine[i].replace(" ", "_")
    firstLine[i] = firstLine[i].toLowerCase()
}
firstLine[firstLine.length-1] = "keterangan_konfirmasi"

lines[0]=""
for (var i = 0; i<firstLine.length; i++){
    lines[0] += firstLine[i]
    if(i===firstLine.length - 1){

    }else lines[0] += ","
}
for(var i = 0; i<lines.length; i++){
    lines[i] = lines[i].replace(",", "")
}
var result = lines.join("\n")
console.log(result)
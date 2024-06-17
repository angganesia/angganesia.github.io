---
layout: me
title: Toram Online Page
permalink: /ToramOnlinePage/
categories: [ToramOnline]
---
<form>
      <h4>Bahan 1</h4>
      <input type="number" id="bahan1" placeholder="Jumlah" name="bahan1">
      <input type="number" id="bahan1stk" value="1" placeholder="30/90/etc">
      <input type="number" id="bahan1harga" placeholder="Harga perStk">
      <h4>Bahan 2</h4>
      <input type="number" id="bahan2" placeholder="Jumlah">
      <input type="number" id="bahan2stk" value="1" placeholder="30/90/etc">
      <input type="number" id="bahan2harga" placeholder="Harga perStk">
      <h4>Bahan 3</h4>
      <input type="number" id="bahan3" placeholder="Jumlah">
      <input type="number" id="bahan3stk" value="1" placeholder="30/90/etc">
      <input type="number" id="bahan3harga" placeholder="Harga perStk">
      <h4>Bahan 4</h4>
      <input type="number" id="bahan4" placeholder="Jumlah">
      <input type="number" id="bahan4stk" value="1" placeholder="30/90/etc">
      <input type="number" id="bahan4harga" placeholder="Harga perStk">
      <!--<h4>Bahan 5</h4>
      <input type="number" id="bahan5" placeholder="Jumlah">
      <input type="number" id="bahan5stk" value="1" placeholder="30/90/etc">
      <input type="number" id="bahan5harga" placeholder="Harga perStk">-->
      <h4>Max Item Creat</h4>
      <input type="number" id="maxcreatitem" placeholder="1/10/etc">
      <h4>Berapa stk yang ingin di buat ?</h4>
      <input type="number" id="needstk" placeholder="Jumlah">
      <h4>Status VIP</h4>
      <select name="vip" id="vip">
        <option value="0.09">VIP</option>
        <option value="0.1" selected>NON - VIP</option>
      </select>
      <h4>Harga Jual</h4>
      <input type="number" id="hargajual" placeholder="Harga Jual CB">
      <br><br>
      <div class="categories">
        <button class="category" type="button" id="hitung">Hitung</button>
      </div>
</form>
    
<script>
      // Specifying options for formatting
      const options = {
        style: 'decimal', // Other options: 'currency', 'percent', etc.
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      };

      document.getElementById('hitung').addEventListener('click', function() {

        //// var nilai 
        var bahan1 = document.getElementById('bahan1').value;
        var bahan1stk = document.getElementById('bahan1stk').value;
        var bahan1harga = document.getElementById('bahan1harga').value;

        var bahan2 = document.getElementById('bahan2').value;
        var bahan2stk = document.getElementById('bahan2stk').value;
        var bahan2harga = document.getElementById('bahan2harga').value;

        var bahan3 = document.getElementById('bahan3').value;
        var bahan3stk = document.getElementById('bahan3stk').value;
        var bahan3harga = document.getElementById('bahan3harga').value;

        var bahan4 = document.getElementById('bahan4').value;
        var bahan4stk = document.getElementById('bahan4stk').value;
        var bahan4harga = document.getElementById('bahan4harga').value;

        //var bahan5 = document.getElementById('bahan5').value;
        //var bahan5stk = document.getElementById('bahan5stk').value;
        //var bahan5harga = document.getElementById('bahan5harga').value;

        var maxcreatitem = document.getElementById('maxcreatitem').value;
        var needstk = document.getElementById('needstk').value;
        var vip = document.getElementById('vip').value;
        var hargajual = document.getElementById('hargajual').value;

        //// Penjumlahan 
        var tbahan1 = Number(bahan1) * Number(maxcreatitem) * Number(needstk);
        var tbahan1stk = Number(tbahan1) / Number(bahan1stk);
        var tbahan1harga = (Number(bahan1harga) / Number(bahan1stk)) * Number(tbahan1);

        var tbahan2 = Number(bahan2) * Number(maxcreatitem) * Number(needstk);
        var tbahan2stk = Number(tbahan2) / Number(bahan2stk);
        var tbahan2harga = (Number(bahan2harga) / Number(bahan2stk)) * Number(tbahan2);

        var tbahan3 = Number(bahan3) * Number(maxcreatitem) * Number(needstk);
        var tbahan3stk = Number(tbahan3) / Number(bahan3stk);
        var tbahan3harga = (Number(bahan3harga) / Number(bahan3stk)) * Number(tbahan3);

        var tbahan4 = Number(bahan4) * Number(maxcreatitem) * Number(needstk);
        var tbahan4stk = Number(tbahan4) / Number(bahan4stk);
        var tbahan4harga = (Number(bahan4harga) / Number(bahan4stk)) * Number(tbahan4);

        //var tbahan5 = Number(bahan5) * Number(maxcreatitem) * Number(needstk);
        ///var tbahan5stk = Number(tbahan5) / Number(bahan5stk);
        //var tbahan5harga = (Number(bahan5harga) / Number(bahan5stk)) * Number(tbahan5);

        var totalHarga = Number(tbahan1harga) + Number(tbahan2harga) + Number(tbahan3harga) + Number(tbahan4harga); //+ Number(tbahan5harga);

        var totalSellTax = Math.ceil((Number(hargajual) - (Number(hargajual) * Number(vip)))) * needstk;

        var netProfit = totalSellTax - totalHarga;

        alert(
          "Bahan 1 = " + tbahan1 + " / " + Math.ceil(tbahan1stk) + "stk / Harga @" + tbahan1harga.toLocaleString('id-ID', options) + "\n" +
          "Bahan 2 = " + tbahan2 + " / " + Math.ceil(tbahan2stk) + "stk / Harga @" + tbahan2harga.toLocaleString('id-ID', options) + "\n" +
          "Bahan 3 = " + tbahan3 + " / " + Math.ceil(tbahan3stk) + "stk / Harga @" + tbahan3harga.toLocaleString('id-ID', options) + "\n" +
          "Bahan 4 = " + tbahan4 + " / " + Math.ceil(tbahan4stk) + "stk / Harga @" + tbahan4harga.toLocaleString('id-ID', options) + "\n\n" +
          //"Bahan 5 = " + tbahan5 + " / " + Math.ceil(tbahan5stk) + "stk / Harga @" + tbahan5harga.toLocaleString('id-ID', options) + "\n\n" +
          "TOTAL = " + totalHarga.toLocaleString('id-ID', options) + "\n" +
          "TOTAL SELL - TAX CB = " + totalSellTax.toLocaleString('id-ID', options) + "\n" +
          "NET PROFIT = " + netProfit.toLocaleString('id-id', options)
        );
      });
</script>
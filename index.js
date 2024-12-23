const CONVERSION_RATES = {
      m: 1.0,
      cm: 100.0,
      in: 39.3701,
      ft: 3.28084,
      mm: 1000.0,
      yd: 1.09361,
      km: 0.001
    };

    document.getElementById('conversionForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const value = parseFloat(document.getElementById('distanceValue').value);
      const from = document.getElementById('from').value;
      const to = document.getElementById('to').value;

      const valueInMeters = value / CONVERSION_RATES[from];
      const convertedValue = valueInMeters * CONVERSION_RATES[to];

      const resultTable = document.getElementById('resultTable');
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${value.toFixed(2)}</td>
        <td>${from}</td>
        <td>${convertedValue.toFixed(2)}</td>
        <td>${to}</td>
      `;
      resultTable.appendChild(newRow);
    });
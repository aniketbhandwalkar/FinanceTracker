document.addEventListener('DOMContentLoaded', function () {
  const expenseForm = document.getElementById('expenseForm');
  const tableBody = document.getElementById('expensesTable')?.getElementsByTagName('tbody')[0];

  // running totals
  let totalExpenses = 0;
  const categoryTotals = {};

  async function apiGetAll() {
    const res = await fetch('/api/expenses');
    if (!res.ok) throw new Error('Failed to load expenses');
    return await res.json();
  }

  async function apiCreate(expense) {
    const res = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    if (!res.ok) throw new Error('Failed to save expense');
    return await res.json();
  }

  async function apiDelete(id) {
    const res = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete expense');
  }

  function addExpenseRow(expense) {
    if (!tableBody) return;
    const newRow = tableBody.insertRow();

    const amount = Number(expense.amount ?? 0);
    const catNameRaw = (expense.category && (expense.category.name || expense.category)) || 'uncategorized';
    const catKey = String(catNameRaw).toLowerCase();
    const categoryText = (expense.category && (expense.category.name || expense.category)) || 'N/A';

    // update totals
    totalExpenses += amount;
    categoryTotals[catKey] = (categoryTotals[catKey] || 0) + amount;

    newRow.innerHTML = `
      <td>${expense.description ?? ''}</td>
      <td>${amount.toFixed(2)}</td>
      <td>${formatDate(expense.date)}</td>
      <td>${categoryText}</td>
      <td><button class="delete-btn" data-id="${expense.id}">Delete</button></td>
    `;

    // delete handler updates totals as well
    newRow.querySelector('.delete-btn').addEventListener('click', async function () {
      try {
        await apiDelete(expense.id);
        // adjust totals
        totalExpenses -= amount;
        categoryTotals[catKey] = Math.max(0, (categoryTotals[catKey] || 0) - amount);
        displayCategoryTotals();
        displayTotalExpenses();
        newRow.remove();
      } catch (e) {
        console.error(e);
        alert('Failed to delete expense');
      }
    });

    displayCategoryTotals();
    displayTotalExpenses();
  }

  function displayCategoryTotals() {
    // update any known category total elements if present
    Object.keys(categoryTotals).forEach(key => {
      const idLower = `${key}-total`;
      const idCap = `${key.charAt(0).toUpperCase() + key.slice(1)}-total`;
      const el = document.getElementById(idLower) || document.getElementById(idCap);
      if (el) {
        // label from element id prefix (best-effort)
        const label = el.id.replace('-total','');
        const pretty = label.charAt(0).toUpperCase() + label.slice(1);
        el.textContent = `${pretty}: $${Number(categoryTotals[key]).toFixed(2)}`;
      }
    });
  }

  function displayTotalExpenses() {
    const el = document.getElementById('total-expenses');
    if (el) el.textContent = `Total Expenses: $${Number(totalExpenses).toFixed(2)}`;
  }

  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  if (expenseForm) {
    expenseForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const expense = {
        description: document.getElementById('description').value,
        amount: parseFloat(document.getElementById('amount').value),
        date: document.getElementById('date').value,
        // Not sending category/user yet; backend entity expects objects
      };

      try {
        const saved = await apiCreate(expense);
        addExpenseRow(saved);
        expenseForm.reset();
      } catch (err) {
        console.error(err);
        alert('Failed to save expense');
      }
    });
  }

  (async function load() {
    try {
      // reset totals, then add rows
      totalExpenses = 0;
      Object.keys(categoryTotals).forEach(k => delete categoryTotals[k]);

      const expenses = await apiGetAll();
      expenses.forEach(addExpenseRow);
    } catch (err) {
      console.error(err);
    }
  })();
});

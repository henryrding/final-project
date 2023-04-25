export async function fetchCatalog() {
  const res = await fetch(('/api/inventory'));
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchCard(cardId) {
  const res = await fetch(`/api/inventory/${cardId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function signUpOrIn(action, username, password, firstName, lastName, email) {
  let body = { username, password, firstName, lastName, email };
  if (action === 'sign-in') {
    body = { username, password };
  }
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const res = await fetch(`/api/auth/${action}`, req)
  if (!res.ok) {
    const message = await res.text(res.body)
    throw new Error(`${message.substring(10, message.length - 2)}`);
  }
  return await res.json();
}

export async function fetchCartInventory() {
  const token = localStorage.getItem('tokenKey');
  if (!token) {
    throw new Error('Token not found');
  }
  const res = await fetch('/api/cartInventory', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function addCartInventory(inventoryId, quantity) {
  const token = localStorage.getItem('tokenKey');
  if (!token) {
    throw new Error('Token not found');
  }
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ inventoryId, quantity })
  };
  const res = await fetch('/api/cartInventory', req);
  if (!res.ok) {
    const message = await res.text(res.body)
    throw new Error(`${message.substring(10, message.length - 2)}`);
  }
  return await res.json();
}

export async function updateCartInventory(inventoryId, quantity) {
  const token = localStorage.getItem('tokenKey');
  if (!token) {
    throw new Error('Token not found');
  }
  const req = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  };
  const res = await fetch(`/api/cartInventory/${inventoryId}`, req);
  if (!res.ok) {
    const message = await res.text(res.body);
    throw new Error(`${message.substring(10, message.length - 2)}`);
  }
  return await res.json();
}

export async function deleteCartInventory(inventoryId) {
  const token = localStorage.getItem('tokenKey');
  if (!token) {
    throw new Error('Token not found');
  }
  const req = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };
  const res = await fetch(`/api/cartInventory/${inventoryId}`, req);
  if (!res.ok) {
    const message = await res.text(res.body);
    throw new Error(`${message.substring(10, message.length - 2)}`);
  }
  return await res.json();
}

export async function clearCartInventory() {
  const token = localStorage.getItem('tokenKey');
  if (!token) {
    throw new Error('Token not found');
  }
  const req = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };
  const res = await fetch(`/api/cartInventory`, req);
  if (!res.ok) {
    const message = await res.text(res.body);
    throw new Error(`${message.substring(10, message.length - 2)}`);
  }
  return await res.json();
}

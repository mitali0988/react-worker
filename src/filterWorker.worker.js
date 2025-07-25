
self.onmessage = function (e) {
  const { query, data } = e.data;
  const lower = query.toLowerCase();

  const filtered = data.filter(item =>
    item.name.toLowerCase().includes(lower)
  );

  self.postMessage(filtered);
};

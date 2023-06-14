

export const getTitles = async (description) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    description
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch("https://i27f13a1be.execute-api.us-east-1.amazonaws.com/dev/titles", requestOptions)
  const result = await response.json()

  return result
}

export const getEpigraphs = async (description, title) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    titleAndDescription: {
      title,
      description
    },
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch("https://i27f13a1be.execute-api.us-east-1.amazonaws.com/dev/titles", requestOptions)
  const result = await response.json()

  return result
}
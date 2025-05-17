export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiUrl = config.apiUrl;
  const reqUrl = `${apiUrl}/api/v1/emails/nexuron/`;

  const body = await readBody(event);

  const response = await $fetch(reqUrl, {
    method: "POST",
    body,
  });

  return response;
});

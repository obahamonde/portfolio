import { createFetch } from '@vueuse/core'
function useAuth(tokenGetter: () => Promise<string>) {
    const fetchAPI = createFetch({
        baseUrl: "/api/",
        options: {
            async beforeFetch({ options }) {
                options.headers = {
                    Authorization: `Bearer ${await tokenGetter()}`,
                    ContentType: 'application/json'
                }
                return { options }
            }
        },
        fetchOptions: {
            mode: 'cors'
        }
    })
    return fetchAPI
}

export default useAuth;
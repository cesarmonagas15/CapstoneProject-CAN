import axios from "axios"

class ApiClient {
  constructor(remoteHostUrl) {
    // this.token = null
    this.remoteHostUrl = remoteHostUrl || "http://localhost:3001"
  }

//   setToken(token) {
//     this.token = token
//   }

  async request({ endpoint, method, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`
    console.debug("API Call:", endpoint, data, method)
    const params = method === "get" ? data : {}

    
    const headers = {
      "Content-Type": "application/json",
    }
    // if (this.token) {
    //   headers["Authorization"] = `Bearer ${this.token}`
    // }

    try {
      const res = await axios({ url, method, data, params, headers })
      return { data: res.data, error: null, message: null }
    } catch (error) {
      console.error("APIclient.makeRequest.error", error.response)
      if (error?.response?.status === 404) return { data: null, error: "Not found" }
      const message = error?.response?.data?.error?.message
      return { data: null, error: error?.response, message }
    }
  }





  // ----------------------------------------SPOONACULAR CALLS START HERE ----------------------------------------//

  // Get Random Recipes Call  (returns the information a given number of random recipes)
  async getRandomRecipes(num) {
    return await this.request({ endpoint: `spoon/recipes/random/${num}`, method: `GET` });
  }

  // Get Recipe Information  Call (returns the information of a single recipe, given by recipe ID)
  async getRecipeInformation(id) {
    return await this.request({ endpoint: `recipes/${id}/information`, method: `GET` });
  }


  // Get Bulk Recipe Information Call (returns information for multiple recipes, given by an array of recipe IDs)
  async getBulkRecipeInformation(ids) {
    // Join the ids array into a comma-separated string
    const idsString = ids.join(",");
    return await this.request({ endpoint: `recipes/informationBulk/${idsString}`, method: `GET` });
  }

    // Advanced Recipe Search Call (returns recipes IDs that match various filter parameters)
    async searchRecipes(filters) {
      return await this.request({ endpoint: `recipes/complexSearch`, method: `GET`, data: filters });
    }

  
}


// export default new ApiClient(import.meta.env.VITE_REMOTE_HOST_URL)
export default new ApiClient("http://localhost:3001")



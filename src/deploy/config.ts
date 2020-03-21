export const getHost = (builderConfig: any): string => {
  return builderConfig.host as string
}

export const getUsername = (builderConfig: any): string => {
  return builderConfig.username as string
}

export const getPassword = (builderConfig: any): string => {
  return builderConfig.password as string
}

export const getRemotePath = (builderConfig: any): string => {
  return builderConfig.remotePath as string
}

export const getPrivateKey = (builderConfig: any): string => {
  return builderConfig.privateKey as string
}

export const getPostDeployCommand = (builderConfig: any): string => {
  return builderConfig.postDeploy as string
}

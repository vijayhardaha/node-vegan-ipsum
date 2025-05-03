class ProcessHelper {
  public cachedPlatform: string;

  constructor() {
    this.cachedPlatform = process.platform;
  }

  public resetPlatform() {
    this.setPlatform(this.cachedPlatform);
  }

  public setPlatform(platform: string = this.cachedPlatform) {
    Object.defineProperty(process, "platform", {
      value: platform,
      configurable: true, // Ensure the property can be redefined
    });
  }
}

export default ProcessHelper;

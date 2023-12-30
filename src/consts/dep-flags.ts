// The unique flag that provides dependency injection for modules
export const DependenciesFlag = {
  IMAGE_REPOSITORY: Symbol('image repository'),
  VIDEO_REPOSITORY: Symbol('video repository'),

  DATABASE_STORAGE: Symbol('database storage'),
  OBJECT_STORAGE: Symbol('object storage'),

  FILESYSTEM_STORAGE: Symbol('filesystem storage'),
};

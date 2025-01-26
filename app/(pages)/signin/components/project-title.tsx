import ProjectLogo from "@/app/components/project-logo";

const ProjectTitle = () => {
  return (
    <div className="left-5 top-5 flex items-center gap-2.5 md:absolute">
      <ProjectLogo size="h-7 w-7" />
      <h1 className="text-nowrap text-xl font-semibold">
        Intelligent Finance Manager
      </h1>
    </div>
  );
};

export default ProjectTitle;

// import { Helmet } from 'react-helmet';
import react from 'react'


type Props = {
  description?: string;
  children: React.ReactNode;
  title?: string;
};

const PageContainer = ({ children }: Props) => (

  <div>

    <title>SchoolOra | LMS for Schools</title>
    <meta name="description" content="SchoolOra is a modern learning management system designed for schools to manage classes, students, assignments, and online learning efficiently." />

    {children}
  </div>

);

export default PageContainer;

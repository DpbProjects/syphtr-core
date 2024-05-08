import React from "react";

import { FormControl, Button } from "@rewind-ui/core";

import { createJob } from "@/utils/actions";

export default function CreateForm() {
  return (
    <form
      className="grid grid-cols-2 gap-4"
      action={(formData) => createJob(formData, 3)}
    >
      <FormControl size="lg">
        <FormControl.Label>Department</FormControl.Label>
        <FormControl.Select name="department">
          <option value="hiring manager">Sales</option>
          <option value="recruiter">HR</option>
          <option value="talent sourcer">IT</option>
          <option value="recruiting coordinator">Management</option>
        </FormControl.Select>
      </FormControl>
      <FormControl size="lg">
        <FormControl.Label>Hiring Team</FormControl.Label>
        <FormControl.Select name="hiringTeam">
          <option value="hiring manager">Hiring Manager</option>
          <option value="recruiter">Recruiter</option>
          <option value="talent sourcer">Talent Sourcer</option>
          <option value="recruiting coordinator">Recruiting Coordinator</option>
        </FormControl.Select>
      </FormControl>
      <FormControl size="lg">
        <FormControl.Label>Title</FormControl.Label>
        <FormControl.Input name="title" placeholder={"Name...."} />
      </FormControl>
      <FormControl size="lg">
        <FormControl.Label>Salary</FormControl.Label>
        <FormControl.Input name="salary" placeholder={"Name...."} />
      </FormControl>
      <FormControl size="lg">
        <FormControl.Label>User</FormControl.Label>
        <FormControl.Input name="userId" placeholder={"Name...."} />
      </FormControl>
      <FormControl size="lg">
        <FormControl.Label>Location</FormControl.Label>
        <FormControl.Input name="location" placeholder={"Name...."} />
      </FormControl>
      <FormControl size="lg">
        <FormControl.Label>Org</FormControl.Label>
        <FormControl.Input name="orgId" placeholder={"Email..."} />
      </FormControl>
      <Button type="submit">Submit</Button>
    </form>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";

import {
  useDeleteCourseMutation,
  useGetAllCourseQuery,
} from "@/redux/features/courses/courseApi";

import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import { styles } from "@/app/styles/styles";

const AllCourses = () => {
  const { theme } = useTheme();

  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");

  const { isLoading, data, refetch } = useGetAllCourseQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "title",
      headerName: "Course Title",
      flex: 1,
    },
    {
      field: "ratings",
      headerName: "Ratings",
      flex: 0.5,
    },
    {
      field: "purchased",
      headerName: "Purchased",
      flex: 0.5,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.5,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Link href={`/admin/edit-course/${params.row.id}`}>
            <FiEdit2
              className="dark:text-white text-black"
              size={20}
            />
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={() => {
              setOpen(true);
              setCourseId(params.row.id);
            }}
            sx={{
              minWidth: "40px",
            }}
          >
            <AiOutlineDelete
              className="dark:text-white text-black"
              size={20}
            />
          </Button>
        );
      },
    },
  ];

  const rows: any[] = [];

  if (data?.courses) {
    data.courses.forEach((course: any) => {
      rows.push({
        id: course._id,
        title: course.name,
        ratings: course.ratings,
        purchased: course.purchased,
        created_at: format(course.createdAt),
      });
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course Deleted Successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(
          errorMessage?.data?.message || "Something went wrong"
        );
      }
    }
  }, [isSuccess, error, refetch]);

  const handleDelete = async () => {
    if (!courseId) return;

    try {
      await deleteCourse(courseId).unwrap();
    } catch (error) {
      console.log("Delete course error:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px]">
          <Box
            sx={{
              m: "20px",
            }}
          >
            <Box
              sx={{
                m: "40px 0 0 0",
                height: "80vh",

                /* Main DataGrid */
                "& .MuiDataGrid-root": {
                  border: "none",
                  outline: "none",
                  backgroundColor:
                    theme === "dark" ? "#111827" : "#ffffff",
                  color:
                    theme === "dark" ? "#ffffff" : "#111827",
                },

                /* Column Header */
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor:
                    theme === "dark" ? "#1f2937" : "#A4A9FC",
                  borderBottom:
                    theme === "dark"
                      ? "1px solid #374151"
                      : "1px solid #ccc",
                  color:
                    theme === "dark" ? "#ffffff" : "#000000",
                },

                "& .MuiDataGrid-columnHeader": {
                  backgroundColor:
                    theme === "dark" ? "#1f2937" : "#A4A9FC",
                  color:
                    theme === "dark" ? "#ffffff" : "#000000",

                  "&:focus": {
                    outline: "none",
                  },

                  "&:focus-within": {
                    outline: "none",
                  },
                },

                "& .MuiDataGrid-columnHeaderTitle": {
                  color:
                    theme === "dark" ? "#ffffff" : "#000000",
                  fontWeight: "600",
                },

                /* Column menu / sort icons */
                "& .MuiDataGrid-sortIcon": {
                  color:
                    theme === "dark" ? "#ffffff" : "#000000",
                },

                "& .MuiDataGrid-menuIconButton": {
                  color:
                    theme === "dark" ? "#ffffff" : "#000000",
                },

                "& .MuiDataGrid-iconButtonContainer": {
                  color:
                    theme === "dark" ? "#ffffff" : "#000000",
                },

                "& .MuiDataGrid-columnSeparator": {
                  color:
                    theme === "dark" ? "#4b5563" : "#d1d5db",
                },

                /* Rows */
                "& .MuiDataGrid-row": {
                  backgroundColor:
                    theme === "dark" ? "#111827" : "#ffffff",

                  color:
                    theme === "dark" ? "#ffffff" : "#000000",

                  borderBottom:
                    theme === "dark"
                      ? "1px solid #374151"
                      : "1px solid #e5e7eb",

                  "&:hover": {
                    backgroundColor:
                      theme === "dark" ? "#1f2937" : "#f3f4f6",
                  },

                  "&.Mui-selected": {
                    backgroundColor:
                      theme === "dark"
                        ? "#273449"
                        : "#e0e7ff",

                    "&:hover": {
                      backgroundColor:
                        theme === "dark"
                          ? "#334155"
                          : "#c7d2fe",
                    },
                  },
                },

                /* Cells */
                "& .MuiDataGrid-cell": {
                  color:
                    theme === "dark" ? "#ffffff" : "#000000",
                  borderBottom:
                    theme === "dark"
                      ? "1px solid #374151"
                      : "1px solid #e5e7eb",

                  "&:focus": {
                    outline: "none",
                  },

                  "&:focus-within": {
                    outline: "none",
                  },
                },

                /* Virtual Scroller */
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor:
                    theme === "dark" ? "#111827" : "#F2F0F0",
                },

                /* Footer / Pagination */
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor:
                    theme === "dark" ? "#1f2937" : "#A4A9FC",

                  color:
                    theme === "dark" ? "#ffffff" : "#000000",

                  borderTop:
                    theme === "dark"
                      ? "1px solid #374151"
                      : "1px solid #ccc",
                },

                "& .MuiTablePagination-root": {
                  color:
                    theme === "dark" ? "#ffffff" : "#000000",
                },

                "& .MuiTablePagination-selectLabel": {
                  color:
                    theme === "dark" ? "#ffffff" : "#000000",
                },

                "& .MuiTablePagination-displayedRows": {
                  color:
                    theme === "dark" ? "#ffffff" : "#000000",
                },

                "& .MuiTablePagination-select": {
                  color:
                    theme === "dark" ? "#ffffff" : "#000000",
                },

                "& .MuiTablePagination-selectIcon": {
                  color:
                    theme === "dark" ? "#ffffff" : "#000000",
                },

                /* Pagination buttons */
                "& .MuiDataGrid-footerContainer button": {
                  color:
                    theme === "dark" ? "#ffffff" : "#000000",
                },

                /* Toolbar */
                "& .MuiDataGrid-toolbarContainer": {
                  backgroundColor:
                    theme === "dark" ? "#1f2937" : "#A4A9FC",

                  color:
                    theme === "dark" ? "#ffffff" : "#000000",

                  borderBottom:
                    theme === "dark"
                      ? "1px solid #374151"
                      : "1px solid #ccc",
                },

                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color:
                    theme === "dark"
                      ? "#ffffff"
                      : "#000000",
                },

                "& .MuiDataGrid-toolbarContainer svg": {
                  color:
                    theme === "dark"
                      ? "#ffffff"
                      : "#000000",
                },

                /* Selected row count */
                "& .MuiDataGrid-selectedRowCount": {
                  color:
                    theme === "dark" ? "#ffffff" : "#000000",
                },

                /* Checkbox */
                "& .MuiCheckbox-root": {
                  color:
                    theme === "dark" ? "#9ca3af" : "#6b7280",
                },

                "& .MuiCheckbox-root.Mui-checked": {
                  color:
                    theme === "dark" ? "#818cf8" : "#4f46e5",
                },

                /* Select icon */
                "& .MuiSelect-icon": {
                  color:
                    theme === "dark" ? "#ffffff" : "#000000",
                },
              }}
            >
              <DataGrid
                checkboxSelection
                rows={rows}
                columns={columns}
                sx={{
                  border:
                    theme === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "1px solid #ccc",
                }}
              />
            </Box>

            {open && (
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none"
                >
                  <h1 className={`${styles.title}`}>
                    Are you sure you want to delete this course?
                  </h1>

                  <div className="flex w-full items-center justify-between mb-6 mt-4">
                    <div
                      className={`${styles.button} !w-[120px] h-[30px] bg-[#47d097]`}
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </div>

                    <div
                      className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                      onClick={handleDelete}
                    >
                      Delete
                    </div>
                  </div>
                </Box>
              </Modal>
            )}
          </Box>
        </div>
      )}
    </>
  );
};

export default AllCourses;
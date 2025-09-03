"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Button, Col, Form, Row, Alert, Card, CardBody, CardHeader } from 'react-bootstrap'
import { assetTypesService, AssetType } from '@/services/api/assetTypes'
import { assetSubTypesService, AssetSubType } from '@/services/api/assetSubTypes'
import { departmentService, Department } from '@/services/api/departments'
import { STORAGE_KEYS } from "@/utils/constants";
import { supplierService, Supplier } from '@/services/api/suppliers'
import { warrantyTypeService, WarrantyType } from '@/services/api/warrantyTypes'
import { assetWarrantyService, CreateAssetWarrantyRequest } from '@/services/api/assetWarranty'
import { toast } from 'react-toastify';
import Select from 'react-select';

import CreateDepartmentModal from '@/components/CreateDepartmentModal'

// Form data interface
interface FormData {
  // Asset Information
  name: string;
  assetType: string;
  subAssetType: string;
  brand: string;
  model: string;
  subModel: string;
  installationDate: string;
  installStatus: string;
  status: string;
  buildingNumber: string;
  departmentId: string;
  floorNumber: string;
  roomNumber: string;
  supplierId: string;
  
  // Warranty Information
  warrantyType: string | number;
  warrantyStartDate: string;
  warrantyEndDate: string;
  warrantyPeriod: number;
  coverageType: string;
  coverageDescription: string;
  termsConditions: string;
  included: string;
  excluded: string;
}

// Form errors interface
interface FormErrors {
  // Asset Information
  name?: string;
  assetType?: string;
  subAssetType?: string;
  brand?: string;
  model?: string;
  subModel?: string;
  installationDate?: string;
  installStatus?: string;
  status?: string;
  buildingNumber?: string;
  departmentId?: string;
  floorNumber?: string;
  roomNumber?: string;
  supplierId?: string;
  
  // Warranty Information
  warrantyType?: string;
  warrantyStartDate?: string;
  warrantyEndDate?: string;
  warrantyPeriod?: string;
  coverageType?: string;
  coverageDescription?: string;
  termsConditions?: string;
  included?: string;
  excluded?: string;
}

export default function AssetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [assetSubTypes, setAssetSubTypes] = useState<AssetSubType[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [warrantyTypes, setWarrantyTypes] = useState<WarrantyType[]>([]);
  const [loadingAssetTypes, setLoadingAssetTypes] = useState(true);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);
  const [loadingWarrantyTypes, setLoadingWarrantyTypes] = useState(true);
   const [assetTypesError, setAssetTypesError] = useState("");
   const [assetSubTypesError, setAssetSubTypesError] = useState("");
   const [departmentsError, setDepartmentsError] = useState("");
   const [suppliersError, setSuppliersError] = useState("");
   const [warrantyTypesError, setWarrantyTypesError] = useState("");
   const [showCreateDepartmentModal, setShowCreateDepartmentModal] = useState(false);

      // Form data state
  const [formData, setFormData] = useState<FormData>({
    // Asset Information
    name: "",
    assetType: "",
    subAssetType: "",
    brand: "",
    model: "",
    subModel: "",
    installationDate: "",
    installStatus: "",
    status: "",
    buildingNumber: "",
    departmentId: "",
    floorNumber: "",
    roomNumber: "",
    supplierId: "",
    
    // Warranty Information
    warrantyType: "",
    warrantyStartDate: "",
    warrantyEndDate: "",
    warrantyPeriod: 0,
    coverageType: "",
    coverageDescription: "",
    termsConditions: "",
    included: "",
    excluded: "",
  });

  // Form errors state
  const [errors, setErrors] = useState<FormErrors>({});

  // Fetch asset types, departments and suppliers on component mount
  useEffect(() => {
    const fetchAssetTypes = async () => {
      try {
        setLoadingAssetTypes(true);
        setAssetTypesError("");
        const data = await assetTypesService.getActiveAssetTypes();
        setAssetTypes(data);
      } catch (err) {
        console.error('Error fetching asset types:', err);
        setAssetTypesError("Failed to load asset types. Please refresh the page.");
      } finally {
        setLoadingAssetTypes(false);
      }
    };

    const fetchDepartments = async () => {
      try {
        setLoadingDepartments(true);
        setDepartmentsError("");
        const data = await departmentService.getDepartmentsByConsumerId();
        setDepartments(data);
      } catch (err) {
        console.error('Error fetching departments:', err);
        setDepartmentsError("Failed to load departments. Please refresh the page.");
      } finally {
        setLoadingDepartments(false);
      }
    };

    const fetchSuppliers = async () => {
      try {
        setLoadingSuppliers(true);
        setSuppliersError("");

        const data = await supplierService.getSuppliersOfConsumerWithStats();
        //const data = await supplierService.getAllSuppliers();

        console.log("Suppliers API Response:", data);
        // Extract supplier objects from ConsumerSupplierWithStats response
        const suppliersList = Array.isArray(data) ? data.map(item => item.supplier) : [];
        console.log("Processed Suppliers List:", suppliersList);
        setSuppliers(suppliersList);
      } catch (err) {
        console.error('Error fetching suppliers:', err);
        setSuppliersError("Failed to load suppliers. Please refresh the page.");
        setSuppliers([]);
      } finally {
        setLoadingSuppliers(false);
      }
    };

    const fetchWarrantyTypes = async () => {
      try {
        setLoadingWarrantyTypes(true);
        setWarrantyTypesError("");
        const data = await warrantyTypeService.getWarrantyTypesByConsumerId();
        setWarrantyTypes(data);
      } catch (err) {
        console.error('Error fetching warranty types:', err);
        setWarrantyTypesError("Failed to load warranty types. Please refresh the page.");
        setWarrantyTypes([]);
      } finally {
        setLoadingWarrantyTypes(false);
      }
    };

    fetchAssetTypes();
    fetchDepartments();
    fetchSuppliers();
    fetchWarrantyTypes();
  }, []);

  // Fetch asset sub-types when asset type changes
  useEffect(() => {
    const fetchAssetSubTypes = async () => {
      if (!formData.assetType) {
        setAssetSubTypes([]);
        return;
      }

      try {
        setAssetSubTypesError("");
        const data = await assetSubTypesService.getAssetSubTypesByAssetTypeId(formData.assetType);
        setAssetSubTypes(data);
      } catch (err) {
        console.error('Error fetching asset sub-types:', err);
        setAssetSubTypesError("Failed to load asset sub-types. Please try again.");
        setAssetSubTypes([]);
      }
    };

    fetchAssetSubTypes();
  }, [formData.assetType]);

  // Search asset sub-types function
  const searchAssetSubTypes = async (searchTerm: string) => {
    if (!formData.assetType || !searchTerm.trim()) {
      return [];
    }

    try {
      const results = await assetSubTypesService.searchAssetSubTypesByAssetTypeId(formData.assetType, searchTerm);
      return results;
    } catch (err) {
      console.error('Error searching asset sub-types:', err);
      return [];
    }
  };

  // Auto-generate asset name when asset type or sub type changes
  useEffect(() => {
    if (formData.assetType && formData.subAssetType) {
      const selectedAssetType = assetTypes.find(at => at.id === formData.assetType);
      const selectedAssetSubType = assetSubTypes.find(ast => ast.id === formData.subAssetType);
      
      if (selectedAssetType && selectedAssetSubType) {
        const generatedName = `${selectedAssetType.assetName} - ${selectedAssetSubType.name}`;
        setFormData(prev => ({ ...prev, name: generatedName }));
      }
    }
  }, [formData.assetType, formData.subAssetType, assetTypes, assetSubTypes]);

  // Calculate warranty end date based on start date and period
  const calculateWarrantyEndDate = (startDate: string, durationMonths: number): string => {
    if (!startDate || durationMonths <= 0) return "";
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + durationMonths);
    return end.toISOString().split('T')[0];
  };

  // Auto-calculate start and end dates based on period from today
  const calculateDatesFromPeriod = (period: number) => {
    if (period > 0) {
      const today = new Date();
      const startDate = today.toISOString().split('T')[0];
      const endDate = new Date(today);
      endDate.setMonth(endDate.getMonth() + period);
      return {
        startDate: startDate,
        endDate: endDate.toISOString().split('T')[0]
      };
    }
    return { startDate: "", endDate: "" };
  };

  // Calculate warranty period in months based on start and end dates
  const calculateWarrantyPeriod = (startDate: string, endDate: string): number => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44)); // Average days per month
    return diffMonths;
  };

  // Handle form field changes
  const handleFieldChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => {
      const updatedData = { ...prev, [field]: value };
      
      // Auto-calculate warranty end date when warranty start date or period changes
      if (field === 'warrantyStartDate' || field === 'warrantyPeriod') {
        const startDate = field === 'warrantyStartDate' ? value as string : prev.warrantyStartDate;
        const duration = field === 'warrantyPeriod' ? value as number : prev.warrantyPeriod;
        
        if (field === 'warrantyPeriod' && duration > 0) {
          if (startDate) {
            // If start date exists, calculate end date based on start date + period
            updatedData.warrantyEndDate = calculateWarrantyEndDate(startDate, duration);
          } else {
            // If no start date exists, calculate both start and end dates from today
            const calculatedDates = calculateDatesFromPeriod(duration);
            updatedData.warrantyStartDate = calculatedDates.startDate;
            updatedData.warrantyEndDate = calculatedDates.endDate;
          }
        } else if (field === 'warrantyPeriod' && duration <= 0) {
          // If period is 0 or empty, clear the dates
          updatedData.warrantyStartDate = "";
          updatedData.warrantyEndDate = "";
        } else if (field === 'warrantyStartDate' && startDate && prev.warrantyPeriod > 0) {
          // Calculate end date based on new start date + existing period
          updatedData.warrantyEndDate = calculateWarrantyEndDate(startDate, prev.warrantyPeriod);
        }
      }
      
      // Auto-calculate warranty period when warranty start date or end date changes
      if (field === 'warrantyStartDate' || field === 'warrantyEndDate') {
        const startDate = field === 'warrantyStartDate' ? value as string : prev.warrantyStartDate;
        const endDate = field === 'warrantyEndDate' ? value as string : prev.warrantyEndDate;
        
        if (field === 'warrantyStartDate' && !value) {
          // If start date is cleared, also clear end date
          updatedData.warrantyEndDate = "";
          updatedData.warrantyPeriod = 0;
        } else if (startDate && endDate) {
          const calculatedPeriod = calculateWarrantyPeriod(startDate, endDate);
          updatedData.warrantyPeriod = calculatedPeriod;
        }
        
        // Validate warranty end date cannot be greater than start date
        if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
          setErrors(prev => ({ 
            ...prev, 
            warrantyEndDate: "Warranty End Date cannot be less than Warranty Start Date" 
          }));
        } else if (errors.warrantyEndDate) {
          // Clear the error if dates are now valid
          setErrors(prev => ({ ...prev, warrantyEndDate: undefined }));
        }
      }
      
      return updatedData;
    });
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Only validate the required fields: asset type, asset sub type, asset name, and department
    if (!formData.name.trim()) newErrors.name = "Asset name is required";
    if (!formData.assetType) newErrors.assetType = "Asset type is required";
    if (!formData.subAssetType) newErrors.subAssetType = "Sub asset type is required";
    if (!formData.departmentId) newErrors.departmentId = "Department is required";

    // Validate warranty dates if both are provided
    if (formData.warrantyStartDate && formData.warrantyEndDate) {
      if (new Date(formData.warrantyEndDate) < new Date(formData.warrantyStartDate)) {
        newErrors.warrantyEndDate = "Warranty End Date cannot be less than Warranty Start Date";
      }
    }

    console.log("Validation errors:", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("=== FORM SUBMISSION TRIGGERED ===");
    console.log("Form submission started");
    e.preventDefault();
    

    
    setLoading(true);
    setError("");

    console.log("Form data before validation:", formData);
    
    if (!validateForm()) {
      console.log("Form validation failed");
      setLoading(false);
      return;
    }

    console.log("Form validation passed, proceeding with API call");

    try {
      // Find the selected asset type and sub-type by ID
      const selectedAssetType = assetTypes.find(at => at.id === formData.assetType);
      const selectedAssetSubType = assetSubTypes.find(ast => ast.id === formData.subAssetType);

      if (!selectedAssetType || !selectedAssetSubType) {
        throw new Error("Invalid asset type or sub-type selected");
      }    
      
             // Create the asset warranty request with nested asset and warranty objects
               // Check if warranty type is selected (simple truthy check)
        // Only include warranty data if any warranty-related fields are actually filled
        const hasWarrantyData = Boolean(
          formData.warrantyType || 
          formData.warrantyStartDate || 
          formData.warrantyEndDate || 
          formData.warrantyPeriod > 0 || 
          formData.coverageType || 
          formData.coverageDescription || 
          formData.termsConditions || 
          formData.included || 
          formData.excluded || 
          formData.supplierId
        );

        const assetWarrantyData: CreateAssetWarrantyRequest = {
          asset: {
            assetTypeId: selectedAssetType!.id,
            assetSubTypeId: selectedAssetSubType!.id,
            assetName: formData.name,
            departmentId: formData.departmentId,
            
            isActive: true,
            isCurrentLocation: true,
            // Only include optional fields if they have values
            ...(formData.installationDate && formData.installationDate.trim() !== '' && { installationDate: new Date(formData.installationDate).toISOString() }),
            ...(formData.installStatus && formData.installStatus.trim() !== '' && { installStatus: formData.installStatus }),
            ...(formData.brand && formData.brand.trim() !== '' && { brand: formData.brand }),
            ...(formData.model && formData.model.trim() !== '' && { model: formData.model }),
            ...(formData.subModel && formData.subModel.trim() !== '' && { subModel: formData.subModel }),
            ...(formData.model && formData.model.trim() !== '' && { partNo: formData.model }), // Using model as part number
            ...(formData.supplierId && suppliers.find(s => s.id === formData.supplierId)?.code && { supplierCode: suppliers.find(s => s.id === formData.supplierId)?.code }),
            // ...(formData.name && { consumerSerialNo: formData.name }), // Using asset name as consumer serial
            ...(formData.supplierId && formData.supplierId.trim() !== '' && { supplierId: formData.supplierId }),
            // ...(formData.model && formData.model.trim() !== '' && { supplierSerialNo: formData.model }), // Using model as serial number
            ...(formData.buildingNumber && formData.buildingNumber.trim() !== '' && { building: formData.buildingNumber }),
            ...(formData.floorNumber && formData.floorNumber.trim() !== '' && { floorNumber: formData.floorNumber }),
            ...(formData.roomNumber && formData.roomNumber.trim() !== '' && { roomNumber: formData.roomNumber }),
            // Set default values for required asset fields
            isAmc: true
          },
          ...(hasWarrantyData && {
            warranty: {
              // Only include warrantyTypeId if warranty type is selected
              ...(formData.warrantyType && String(formData.warrantyType).trim() !== '' && { warrantyTypeId: parseInt(String(formData.warrantyType)) }),
              // Include other fields if they have values
              ...(formData.warrantyStartDate && formData.warrantyStartDate.trim() !== '' && { startDate: formData.warrantyStartDate }),
              ...(formData.warrantyEndDate && formData.warrantyEndDate.trim() !== '' && { endDate: formData.warrantyEndDate }),
              ...(formData.warrantyPeriod > 0 && { warrantyPeriod: formData.warrantyPeriod }),
              ...(formData.coverageType && formData.coverageType.trim() !== '' && { coverageType: formData.coverageType }),
              ...(formData.coverageDescription && formData.coverageDescription.trim() !== '' && { coverageDescription: formData.coverageDescription }),
              ...(formData.termsConditions && formData.termsConditions.trim() !== '' && { termsConditions: formData.termsConditions }),
              ...(formData.included && formData.included.trim() !== '' && { included: formData.included }),
              ...(formData.excluded && formData.excluded.trim() !== '' && { excluded: formData.excluded }),
              ...(formData.supplierId && formData.supplierId.trim() !== '' && { supplierId: formData.supplierId }),
 
              // Set default values for required warranty fields
              isActive: true,
              autoRenewal: false
            }
          })
        };

              // Log the request data for debugging
        console.log("Form data:", formData);
        console.log("Has warranty data:", hasWarrantyData);
        console.log("Warranty type selected:", formData.warrantyType);
        console.log("Warranty object being created:", hasWarrantyData ? {
          ...(formData.warrantyType && { warrantyTypeId: parseInt(String(formData.warrantyType)) }),
          isActive: true,
          autoRenewal: false
        } : null);
        console.log("Sending asset warranty creation request:", JSON.stringify(assetWarrantyData, null, 2));
      
      console.log("About to make API call to assetWarrantyService.createAssetWarranty");
      
      // Single API call to create asset with warranty using the /asset/warranty endpoint
      const result = await assetWarrantyService.createAssetWarranty(assetWarrantyData);
      
      console.log("Asset created successfully:", result);
    
      console.log("Form submitted:", formData);
      
      // Show success notification
      toast.success('Asset created successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Redirect to assets listing page after successful creation
      setTimeout(() => {
        router.push('/assets');
      }, 1500);
    } catch (err) {
      console.error("Error creating asset:", err);
      setError("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

     // Handle department creation
   const handleDepartmentCreated = async () => {
     try {
       // Refresh the departments list to get the newly created department
       const updatedDepartments = await departmentService.getDepartmentsByConsumerId();
       setDepartments(updatedDepartments);
       
       // If there's only one department now, select it automatically
       if (updatedDepartments.length === 1) {
         setFormData(prev => ({ ...prev, departmentId: updatedDepartments[0].deptId }));
       }
     } catch (err) {
       console.error('Error refreshing departments:', err);
     }
   };

   // Reset form
   const handleReset = () => {
    setFormData({
      name: "",
      assetType: "",
      subAssetType: "",
      brand: "",
      model: "",
      subModel: "",
      installationDate: "",
      installStatus: "",
      status: "",
      buildingNumber: "",
      departmentId: "",
      floorNumber: "",
      roomNumber: "",
      supplierId: "",
      warrantyType: "",
      warrantyStartDate: "",
      warrantyEndDate: "",
      warrantyPeriod: 0,
      coverageType: "",
      coverageDescription: "",
      termsConditions: "",
      included: "",
      excluded: "",
    });
    setErrors({});
  };

  return (
    <>

      
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <div className="mb-4">
                <div>
                  <span className="badge bg-primary-subtle text-primary px-2 fs-12 mb-3">
                    New Asset
                  </span>
                  <h3 className="m-0 fw-bolder fs-20">Create New Asset</h3>
                  <p className="text-muted mb-0 mt-1">Fill in the details below to add a new asset to the system.</p>
                </div>
              </div>

                             {error && (
                 <Alert variant="danger" className="mb-4">
                   <IconifyIcon icon="tabler:alert-circle" className="me-2" />
                   {error}
                 </Alert>
               )}

              {(assetTypesError || assetSubTypesError || suppliersError || warrantyTypesError) && (
                <Alert variant="warning" className="mb-4">
                  <IconifyIcon icon="tabler:alert-triangle" className="me-2" />
                  {assetTypesError || assetSubTypesError || suppliersError || warrantyTypesError}
                </Alert>
              )}
              
                            <Form onSubmit={handleSubmit}>
                {/* Asset Information Section */}
                <Card className="mb-4">
                  <CardBody>
                    <h5 className="fw-bold pb-2 mb-3 fs-16 border-bottom">
                      <IconifyIcon icon="tabler:cube" className="me-2" />
                      Asset Information
                    </h5>
                    {/* Row 1: Asset Type, Sub Asset Type, Asset Name */}
                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="assetType">Asset Type *</Form.Label>
                          <Form.Select 
                            id="assetType"
                            value={formData.assetType}
                            onChange={(e) => handleFieldChange("assetType", e.target.value)}
                            isInvalid={!!errors.assetType}
                            disabled={loadingAssetTypes}
                          >
                            <option value="">
                              {loadingAssetTypes ? "Loading asset types..." : "Select asset type"}
                            </option>
                            {assetTypes.map((assetType) => (
                              <option key={assetType.id} value={assetType.id}>
                                {assetType.assetName} ({assetType.code})
                              </option>
                            ))}
                          </Form.Select>
                          {loadingAssetTypes && (
                            <div className="mt-2">
                              <small className="text-muted">Loading asset types...</small>
                            </div>
                          )}
                          {errors.assetType && (
                            <Form.Control.Feedback type="invalid">
                              {errors.assetType}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      </Col>
                      
                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="subAssetType">Sub Asset Type *</Form.Label>
                          <Select
                            id="subAssetType"
                            className="select2"
                            classNamePrefix="select2"
                            value={assetSubTypes.find(ast => ast.id === formData.subAssetType) ? {
                              value: formData.subAssetType,
                              label: `${assetSubTypes.find(ast => ast.id === formData.subAssetType)?.name} (${assetSubTypes.find(ast => ast.id === formData.subAssetType)?.code})`
                            } : null}
                            onChange={(selectedOption: any) => 
                              handleFieldChange("subAssetType", selectedOption ? selectedOption.value : "")
                            }
                            options={assetSubTypes.map(ast => ({
                              value: ast.id,
                              label: `${ast.name} (${ast.code})`
                            }))}
                            placeholder="Type to search sub asset types..."
                            isDisabled={!formData.assetType || loadingAssetTypes}
                            isClearable={true}
                            isSearchable={true}
                            noOptionsMessage={() => "No sub asset types found"}
                            loadingMessage={() => "Loading..."}
                            onInputChange={(inputValue: string, { action }) => {
                              // Only update options when user is typing, not when selecting
                              if (action === 'input-change' && inputValue && inputValue.length >= 2) {
                                searchAssetSubTypes(inputValue).then(searchResults => {
                                  setAssetSubTypes(searchResults);
                                }).catch(err => {
                                  console.error('Error searching asset sub-types:', err);
                                });
                              } else if (action === 'input-change' && inputValue === '') {
                                // Reset to initial list when search is cleared
                                if (formData.assetType) {
                                  assetSubTypesService.getAssetSubTypesByAssetTypeId(formData.assetType).then(data => {
                                    setAssetSubTypes(data);
                                  }).catch(err => {
                                    console.error('Error fetching asset sub-types:', err);
                                  });
                                }
                              }
                            }}
                            filterOption={() => true} // Disable client-side filtering since we're using server-side search
                          />
                          {formData.assetType && assetSubTypes.length === 0 && (
                            <div className="mt-2">
                              <small className="text-muted">No sub asset types found for this asset type</small>
                            </div>
                          )}
                          {errors.subAssetType && (
                            <Form.Control.Feedback type="invalid">
                              {errors.subAssetType}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      </Col>

                                             <Col lg={4}>
                         <div className="mb-3">
                           <Form.Label htmlFor="name">Asset Name *</Form.Label>
                           <Form.Control
                             type="text"
                             id="name"
                             placeholder="Enter asset name"
                             value={formData.name}
                             onChange={(e) => handleFieldChange("name", e.target.value)}
                             isInvalid={!!errors.name}
                           />
                           {/* {formData.assetType && formData.subAssetType && (
                             <div className="mt-2">
                               <small className="text-muted">
                                 Auto-generated from selected asset type and sub type. You can edit this field.
                               </small>
                             </div>
                           )} */}
                           {errors.name && (
                             <Form.Control.Feedback type="invalid">
                               {errors.name}
                             </Form.Control.Feedback>
                           )}
                         </div>
                       </Col>
                    </Row>

                    {/* Row 2: Brand, Model, Sub Model */}
                    <Row>
                      <Col lg={4}>
                                                 <div className="mb-3">
                           <Form.Label htmlFor="brand">Brand</Form.Label>
                          <Form.Control
                            type="text"
                            id="brand"
                            placeholder="Enter brand"
                            value={formData.brand}
                            onChange={(e) => handleFieldChange("brand", e.target.value)}
                            isInvalid={!!errors.brand}
                          />
                          {errors.brand && (
                            <Form.Control.Feedback type="invalid">
                              {errors.brand}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      </Col>
                      
                      <Col lg={4}>
                                                 <div className="mb-3">
                           <Form.Label htmlFor="model">Model</Form.Label>
                          <Form.Control
                            type="text"
                            id="model"
                            placeholder="Enter model"
                            value={formData.model}
                            onChange={(e) => handleFieldChange("model", e.target.value)}
                            isInvalid={!!errors.model}
                          />
                          {errors.model && (
                            <Form.Control.Feedback type="invalid">
                              {errors.model}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      </Col>

                      <Col lg={4}>
                        <div className="mb-3">
                          <Form.Label htmlFor="subModel">Sub Model</Form.Label>
                          <Form.Control
                            type="text"
                            id="subModel"
                            placeholder="Enter sub model (optional)"
                            value={formData.subModel}
                            onChange={(e) => handleFieldChange("subModel", e.target.value)}
                            isInvalid={!!errors.subModel}
                          />
                          {errors.subModel && (
                            <Form.Control.Feedback type="invalid">
                              {errors.subModel}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      </Col>
                    </Row>

                    {/* Row 3: Installation Date, Installation Status, Supplier */}
                    <Row>
                      <Col lg={4}>
                                                 <div className="mb-3">
                           <Form.Label htmlFor="installationDate">Installation Date</Form.Label>
                          <Form.Control
                            type="date"
                            id="installationDate"
                            value={formData.installationDate}
                            onChange={(e) => handleFieldChange("installationDate", e.target.value)}
                            isInvalid={!!errors.installationDate}
                          />
                          {errors.installationDate && (
                            <Form.Control.Feedback type="invalid">
                              {errors.installationDate}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      </Col>
                      
                      <Col lg={4}>
                                                 <div className="mb-3">
                           <Form.Label htmlFor="installStatus">Installation Status</Form.Label>
                          <Form.Select
                            id="installStatus"
                            value={formData.installStatus}
                            onChange={(e) => handleFieldChange("installStatus", e.target.value)}
                            isInvalid={!!errors.installStatus}
                          >
                            <option value="">Select installation status</option>
                            <option value="Installable">Installable</option>
                            <option value="Installed">Installed</option>
                            <option value="ReadyToUse">Ready To Use</option>
                          </Form.Select>
                          {errors.installStatus && (
                            <Form.Control.Feedback type="invalid">
                              {errors.installStatus}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      </Col>
                      
                      <Col lg={4}>
                                                 <div className="mb-3">
                           <Form.Label htmlFor="supplierId">Supplier</Form.Label>
                          <Form.Select
                            id="supplierId"
                            value={formData.supplierId}
                            onChange={(e) => handleFieldChange("supplierId", e.target.value)}
                            isInvalid={!!errors.supplierId}
                            disabled={loadingSuppliers}
                          >
                            <option value="">
                              {loadingSuppliers ? "Loading suppliers..." : `Select supplier (${suppliers.length} available)`}
                            </option>
                            {suppliers.map((supplier) => (
                              <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                              </option>
                            ))}
                          </Form.Select>
                          {errors.supplierId && (
                            <Form.Control.Feedback type="invalid">
                              {errors.supplierId}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      </Col>

                    </Row>

                    {/* Row 4: Department, Building Number, Floor Number */}
                    <Row>
                                                                     <Col lg={4}>
                          <div className="mb-3">
                            <div className="d-flex align-items-center mb-2">
                              <Form.Label htmlFor="departmentId" className="mb-0 me-2">Department *</Form.Label>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => setShowCreateDepartmentModal(true)}
                                className="d-flex align-items-center p-1"
                                style={{ minWidth: '24px', height: '24px' }}
                              >
                                <IconifyIcon icon="tabler:plus" style={{ fontSize: '12px' }} />
                              </Button>
                            </div>
                            <Form.Select
                              id="departmentId"
                              value={formData.departmentId}
                              onChange={(e) => handleFieldChange("departmentId", e.target.value)}
                              isInvalid={!!errors.departmentId}
                              disabled={loadingDepartments}
                            >
                              <option value="">
                                {loadingDepartments ? "Loading departments..." : "Select department"}
                              </option>
                              {departments.map((department) => (
                                <option key={department.deptId} value={department.deptId}>
                                  {department.deptName}
                                </option>
                              ))}
                            </Form.Select>
                            {loadingDepartments && (
                              <div className="mt-2">
                                <small className="text-muted">Loading departments...</small>
                              </div>
                            )}
                            {errors.departmentId && (
                              <Form.Control.Feedback type="invalid">
                                {errors.departmentId}
                              </Form.Control.Feedback>
                            )}
                          </div>
                        </Col>
                      
                      <Col lg={4}>
                                                 <div className="mb-3">
                           <Form.Label htmlFor="buildingNumber">Building Number</Form.Label>
                          <Form.Control
                            type="text"
                            id="buildingNumber"
                            placeholder="Enter building number"
                            value={formData.buildingNumber}
                            onChange={(e) => handleFieldChange("buildingNumber", e.target.value)}
                            isInvalid={!!errors.buildingNumber}
                          />
                          {errors.buildingNumber && (
                            <Form.Control.Feedback type="invalid">
                              {errors.buildingNumber}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      </Col>

                      <Col lg={4}>
                                                 <div className="mb-3">
                           <Form.Label htmlFor="floorNumber">Floor Number</Form.Label>
                          <Form.Control
                            type="text"
                            id="floorNumber"
                            placeholder="Enter floor number"
                            value={formData.floorNumber}
                            onChange={(e) => handleFieldChange("floorNumber", e.target.value)}
                            isInvalid={!!errors.floorNumber}
                          />
                          {errors.floorNumber && (
                            <Form.Control.Feedback type="invalid">
                              {errors.floorNumber}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      </Col>
                    </Row>

                    {/* Row 5: Room Number */}
                    <Row>
                      <Col lg={4}>
                                                 <div className="mb-3">
                           <Form.Label htmlFor="roomNumber">Room Number</Form.Label>
                          <Form.Control
                            type="text"
                            id="roomNumber"
                            placeholder="Enter room number"
                            value={formData.roomNumber}
                            onChange={(e) => handleFieldChange("roomNumber", e.target.value)}
                            isInvalid={!!errors.roomNumber}
                          />
                          {errors.roomNumber && (
                            <Form.Control.Feedback type="invalid">
                              {errors.roomNumber}
                            </Form.Control.Feedback>
                          )}
                        </div>
                      </Col>
                      <Col lg={8}>
                        {/* Empty space for balance */}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                {/* Warranty Information Section */}
                <Card className="mb-4">
                  <CardBody>
                  <h5 className="fw-bold pb-2 mb-3 fs-16 border-bottom">
                    <IconifyIcon icon="tabler:shield-check" className="me-2" />
                    Warranty Information
                  </h5>
                  {/* Row 1: Warranty Type, Coverage Type, Warranty Period */}
                  <Row>
                    <Col lg={4}>
                      <div className="mb-3">
                                                 <Form.Label htmlFor="warrantyType">Warranty Type</Form.Label>
                        <Form.Select
                          id="warrantyType"
                          value={formData.warrantyType}
                          onChange={(e) => handleFieldChange("warrantyType", e.target.value)}
                          isInvalid={!!errors.warrantyType}
                          disabled={loadingWarrantyTypes}
                        >
                          <option value="">
                            {loadingWarrantyTypes ? "Loading warranty types..." : "Select warranty type"}
                          </option>
                          {warrantyTypes.map((warrantyType) => (
                            <option key={warrantyType.warrantyTypeId} value={warrantyType.warrantyTypeId}>
                              {warrantyType.typeName}
                            </option>
                          ))}
                        </Form.Select>
                        {loadingWarrantyTypes && (
                          <div className="mt-2">
                            <small className="text-muted">Loading warranty types...</small>
                          </div>
                        )}
                        {errors.warrantyType && (
                          <Form.Control.Feedback type="invalid">
                            {errors.warrantyType}
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </Col>

                    <Col lg={4}>
                      <div className="mb-3">
                                                 <Form.Label htmlFor="coverageType">Coverage Type</Form.Label>
                        <Form.Select
                          id="coverageType"
                          value={formData.coverageType}
                          onChange={(e) => handleFieldChange("coverageType", e.target.value)}
                          isInvalid={!!errors.coverageType}
                        >
                          <option value="">Select coverage type</option>
                          <option value="parts">Parts Only</option>
                          <option value="labor">Labor Only</option>
                          <option value="parts_labor">Parts & Labor</option>
                          <option value="comprehensive">Comprehensive</option>
                          <option value="premium">Premium</option>
                        </Form.Select>
                        {errors.coverageType && (
                          <Form.Control.Feedback type="invalid">
                            {errors.coverageType}
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </Col>

                    <Col lg={4}>
                      <div className="mb-3">
                                                 <Form.Label htmlFor="warrantyPeriod">Warranty Period (months)</Form.Label>
                        <Form.Control
                          type="number"
                          id="warrantyPeriod"
                          placeholder="Enter warranty period in months"
                          min="0"
                          value={formData.warrantyPeriod || ""}
                          onChange={(e) => handleFieldChange("warrantyPeriod", parseInt(e.target.value) || 0)}
                          isInvalid={!!errors.warrantyPeriod}
                        />
                        {errors.warrantyPeriod && (
                          <Form.Control.Feedback type="invalid">
                            {errors.warrantyPeriod}
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </Col>
                  </Row>

                  {/* Row 2: Warranty Start Date, Warranty End Date, Included */}
                  <Row>
                    <Col lg={4}>
                      <div className="mb-3">
                                                 <Form.Label htmlFor="warrantyStartDate">Warranty Start Date</Form.Label>
                        <Form.Control
                          type="date"
                          id="warrantyStartDate"
                          value={formData.warrantyStartDate}
                          onChange={(e) => handleFieldChange("warrantyStartDate", e.target.value)}
                          isInvalid={!!errors.warrantyStartDate}
                        />
                        {errors.warrantyStartDate && (
                          <Form.Control.Feedback type="invalid">
                            {errors.warrantyStartDate}
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </Col>
                    
                    <Col lg={4}>
                      <div className="mb-3">
                        <Form.Label htmlFor="warrantyEndDate">Warranty End Date</Form.Label>
                        <Form.Control
                          type="date"
                          id="warrantyEndDate"
                          value={formData.warrantyEndDate}
                          onChange={(e) => handleFieldChange("warrantyEndDate", e.target.value)}
                          isInvalid={!!errors.warrantyEndDate}
                          min={formData.warrantyStartDate || undefined}
                        />
                        {errors.warrantyEndDate && (
                          <Form.Control.Feedback type="invalid">
                            {errors.warrantyEndDate}
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </Col>

                    <Col lg={4}>
                      <div className="mb-3">
                        <Form.Label htmlFor="included">Included</Form.Label>
                        <Form.Control
                          type="text"
                          id="included"
                          placeholder="What's included in warranty"
                          value={formData.included}
                          onChange={(e) => handleFieldChange("included", e.target.value)}
                          isInvalid={!!errors.included}
                        />
                        {errors.included && (
                          <Form.Control.Feedback type="invalid">
                            {errors.included}
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </Col>
                  </Row>

                  {/* Row 3: Excluded */}
                  <Row>
                    <Col lg={4}>
                      <div className="mb-3">
                        <Form.Label htmlFor="excluded">Excluded</Form.Label>
                        <Form.Control
                          type="text"
                          id="excluded"
                          placeholder="What's excluded from warranty"
                          value={formData.excluded}
                          onChange={(e) => handleFieldChange("excluded", e.target.value)}
                          isInvalid={!!errors.excluded}
                        />
                        {errors.excluded && (
                          <Form.Control.Feedback type="invalid">
                            {errors.excluded}
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </Col>
                    
                    <Col lg={6}>
                      {/* Empty column for balance */}
                    </Col>
                  </Row>

                  {/* Row 5: Coverage Description */}
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <Form.Label htmlFor="coverageDescription">Coverage Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          id="coverageDescription"
                          rows={3}
                          placeholder="Enter detailed coverage description"
                          value={formData.coverageDescription}
                          onChange={(e) => handleFieldChange("coverageDescription", e.target.value)}
                          isInvalid={!!errors.coverageDescription}
                        />
                        {errors.coverageDescription && (
                          <Form.Control.Feedback type="invalid">
                            {errors.coverageDescription}
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </Col>
                  </Row>

                  {/* Row 6: Terms & Conditions */}
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <Form.Label htmlFor="termsConditions">Terms & Conditions</Form.Label>
                        <Form.Control
                          as="textarea"
                          id="termsConditions"
                          rows={4}
                          placeholder="Enter warranty terms and conditions"
                          value={formData.termsConditions}
                          onChange={(e) => handleFieldChange("termsConditions", e.target.value)}
                          isInvalid={!!errors.termsConditions}
                        />
                        {errors.termsConditions && (
                          <Form.Control.Feedback type="invalid">
                            {errors.termsConditions}
                          </Form.Control.Feedback>
                        )}
                      </div>
                    </Col>
                  </Row>

              {/* Action Buttons */}
              <div className="text-end mt-4">
                <Button 
                  variant="outline-secondary" 
                  type="button" 
                  onClick={handleReset}
                  className="me-2"
                >
                  <IconifyIcon icon="tabler:refresh" className="me-1" />
                  Reset
                </Button>
                <Button 
                  variant="primary" 
                  type="submit"
                  disabled={loading}
                  onClick={() => console.log("Button clicked!")}
                >
                  {loading ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-1" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <IconifyIcon icon="tabler:device-floppy" className="me-1" />
                      Create Asset
                    </>
                  )}
                </Button>
              </div>
                  </CardBody>
                </Card>
              </Form>
            </CardBody>
          </Card>
                 </Col>
       </Row>

       {/* Create Department Modal */}
       <CreateDepartmentModal
         show={showCreateDepartmentModal}
         onHide={() => setShowCreateDepartmentModal(false)}
         onSuccess={handleDepartmentCreated}
         existingDepartments={departments}
       />
     </>
   );
 } 
"use client";

import React, { useState, useEffect } from "react";
import PageTitle from '@/components/PageTitle'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import { Button, Col, Form, Row, Alert } from 'react-bootstrap'
import { assetTypesService, AssetType } from '@/services/api/assetTypes'
import { assetSubTypesService, AssetSubType } from '@/services/api/assetSubTypes'
import { departmentService, Department } from '@/services/api/departments'
import { assetCompleteService, CreateAssetCompleteRequest } from '@/services/api/assetComplete'
import { STORAGE_KEYS } from "@/utils/constants";

// Form data interface
interface FormData {
  name: string;
  assetType: string;
  subAssetType: string;
  brand: string;
  model: string;
  subModel: string;
  installationDate: string;
  warrantyDuration: number;
  warrantyStartDate: string;
  warrantyEndDate: string;
  buildingNumber: string;
  departmentId: string;
  floorNumber: string;
  roomNumber: string;
}

// Form errors interface
interface FormErrors {
  name?: string;
  assetType?: string;
  subAssetType?: string;
  brand?: string;
  model?: string;
  subModel?: string;
  installationDate?: string;
  warrantyDuration?: string;
  warrantyStartDate?: string;
  warrantyEndDate?: string;
  buildingNumber?: string;
  departmentId?: string;
  floorNumber?: string;
  roomNumber?: string;
}

export default function AssetPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [assetSubTypes, setAssetSubTypes] = useState<AssetSubType[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingAssetTypes, setLoadingAssetTypes] = useState(true);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [assetTypesError, setAssetTypesError] = useState("");
  const [assetSubTypesError, setAssetSubTypesError] = useState("");
  const [departmentsError, setDepartmentsError] = useState("");

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    assetType: "",
    subAssetType: "",
    brand: "",
    model: "",
    subModel: "",
    installationDate: "",
    warrantyDuration: 0,
    warrantyStartDate: new Date().toISOString().split('T')[0], // Current date
    warrantyEndDate: new Date().toISOString().split('T')[0], // Current date
    buildingNumber: "",
    departmentId: "",
    floorNumber: "",
    roomNumber: "",
  });

  // Form errors state
  const [errors, setErrors] = useState<FormErrors>({});

  // Fetch asset types and departments on component mount
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
        const consumerId = JSON.parse(localStorage.getItem(STORAGE_KEYS.consumerId) || "{}") || "";
        if (consumerId) {
          const data = await departmentService.getDepartmentsByConsumerId(consumerId);
          setDepartments(data);
        }
      } catch (err) {
        console.error('Error fetching departments:', err);
        setDepartmentsError("Failed to load departments. Please refresh the page.");
      } finally {
        setLoadingDepartments(false);
      }
    };

    fetchAssetTypes();
    fetchDepartments();
  }, []);

  // Fetch asset sub-types when asset type changes
  useEffect(() => {
    const fetchAssetSubTypes = async () => {
      if (!formData.assetType) {
        setAssetSubTypes([]);
        setFormData(prev => ({ ...prev, subAssetType: "" }));
        return;
      }

      try {
        setAssetSubTypesError("");
        
        // Find the selected asset type to get its ID
        const selectedAssetType = assetTypes.find(at => at.code.toLowerCase() === formData.assetType);
        
        if (!selectedAssetType) {
          setAssetSubTypes([]);
          setFormData(prev => ({ ...prev, subAssetType: "" }));
          return;
        }

        // Get all asset sub-types and filter by asset type ID
        const allAssetSubTypes = await assetSubTypesService.getActiveAssetSubTypes();
        const filteredSubTypes = allAssetSubTypes.filter(
          subType => subType.assetTypeId === selectedAssetType.id
        );
        
        // Update the options without any loading states
        setAssetSubTypes(filteredSubTypes);
        
        // Only reset if the current value is not valid for the new asset type
        const currentSubAssetType = formData.subAssetType;
        const isValidCurrentValue = filteredSubTypes.some(
          subType => subType.code.toLowerCase() === currentSubAssetType
        );
        if (!isValidCurrentValue) {
          setFormData(prev => ({ ...prev, subAssetType: "" }));
        }
      } catch (err) {
        console.error('Error fetching asset sub-types:', err);
        setAssetSubTypesError("Failed to load asset sub-types. Please try again.");
        setAssetSubTypes([]);
        setFormData(prev => ({ ...prev, subAssetType: "" }));
      }
    };

    fetchAssetSubTypes();
  }, [formData.assetType, assetTypes]);

  // Calculate warranty end date based on start date and duration (months)
  const calculateWarrantyEndDate = (startDate: string, durationMonths: number): string => {
    const start = new Date(startDate);
    const end = new Date(start.getTime() + (durationMonths * 30 * 24 * 60 * 60 * 1000));
    return end.toISOString().split('T')[0];
  };

  // Handle form field changes
  const handleFieldChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => {
      const updatedData = { ...prev, [field]: value };
      
      // Auto-calculate warranty end date when warranty start date or duration changes
      if (field === 'warrantyStartDate' || field === 'warrantyDuration') {
        const startDate = field === 'warrantyStartDate' ? value as string : prev.warrantyStartDate;
        const duration = field === 'warrantyDuration' ? value as number : prev.warrantyDuration;
        updatedData.warrantyEndDate = calculateWarrantyEndDate(startDate, duration);
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

    if (!formData.name.trim()) newErrors.name = "Asset name is required";
    if (!formData.assetType) newErrors.assetType = "Asset type is required";
    if (!formData.subAssetType) newErrors.subAssetType = "Sub asset type is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.installationDate) newErrors.installationDate = "Installation date is required";
    if (formData.warrantyDuration < 0) newErrors.warrantyDuration = "Must be 0 or greater";
    if (!formData.buildingNumber.trim()) newErrors.buildingNumber = "Building number is required";
    if (!formData.departmentId) newErrors.departmentId = "Department is required";
    if (!formData.floorNumber.trim()) newErrors.floorNumber = "Floor number is required";
    if (!formData.roomNumber.trim()) newErrors.roomNumber = "Room number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

          try {
        // Find the selected asset type and sub-type
        const selectedAssetType = assetTypes.find(at => at.code.toLowerCase() === formData.assetType);
        const selectedAssetSubType = assetSubTypes.find(ast => ast.code.toLowerCase() === formData.subAssetType);

        if (!selectedAssetType || !selectedAssetSubType) {
          throw new Error("Invalid asset type or sub-type selected");
        }

        // Create the complete asset request
        const completeAssetData: CreateAssetCompleteRequest = {
          assetTypeId: selectedAssetType.id,
          assetSubTypeId: selectedAssetSubType.id,
          assetName: formData.name,
          warrantyPeriod: formData.warrantyDuration,
          warrantyStartDate: new Date(formData.warrantyStartDate),
          warrantyEndDate: new Date(formData.warrantyEndDate),
          installationDate: new Date(formData.installationDate),
          brand: formData.brand,
          model: formData.model,
          subModel: formData.subModel,
          isActive: true,
          consumerId: JSON.parse(localStorage.getItem(STORAGE_KEYS.consumerId) || "{}") || "",
          partNo: formData.model, // Using model as part number
          supplierCode: formData.brand.toUpperCase() + "-" + formData.model.replace(/\s+/g, "-"),
          warrantyId: "WARR-001", // Default value
          consumerSerialNo: formData.name, // Using asset name as consumer serial
          grnId: "cmdsjhwoh000z14faps90yrw2", // Default value
          grnItemId: "cmdsjhwvp001714faegmv1mf1", // Default value
          poLineItemId: "clx1234567890abcdeh", // Default value
          supplierId: "sup_dell", // Default value
          supplierSerialNo: formData.model, // Using model as serial number
          departmentId: formData.departmentId,
          building: formData.buildingNumber,
          floorNumber: formData.floorNumber,
          roomNumber: formData.roomNumber,
          isCurrentLocation: true
        };

        // Single API call to create asset, location, and installation
        const result = await assetCompleteService.createAssetComplete(completeAssetData);
        
        console.log("Asset created successfully:", result);
      
      console.log("Form submitted:", formData);
      setSubmitted(true);
      
              // Reset form
        setFormData({
          name: "",
          assetType: "",
          subAssetType: "",
          brand: "",
          model: "",
          subModel: "",
          installationDate: "",
          warrantyDuration: 0,
          warrantyStartDate: new Date().toISOString().split('T')[0],
          warrantyEndDate: new Date().toISOString().split('T')[0],
          buildingNumber: "",
          departmentId: "",
          floorNumber: "",
          roomNumber: "",
        });
      setErrors({});
      
      // Reset submitted state after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle title="Asset Management" />
      
      <ComponentContainerCard title="Add New Asset" description="Fill in the details below to add a new asset to the system.">
        {submitted && (
          <Alert variant="success" className="mb-3">
            Asset added successfully!
          </Alert>
        )}
        
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        {assetTypesError && (
          <Alert variant="warning" className="mb-3">
            {assetTypesError}
          </Alert>
        )}

        {assetSubTypesError && (
          <Alert variant="warning" className="mb-3">
            {assetSubTypesError}
          </Alert>
        )}

        {departmentsError && (
          <Alert variant="warning" className="mb-3">
            {departmentsError}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <Form.Label htmlFor="assetType">Asset Type</Form.Label>
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
                    <option key={assetType.id} value={assetType.code.toLowerCase()}>
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
            
            <Col lg={6}>
              <div className="mb-3">
                <Form.Label htmlFor="subAssetType">Sub Asset Type</Form.Label>
                <Form.Select 
                  id="subAssetType"
                  value={formData.subAssetType}
                  onChange={(e) => handleFieldChange("subAssetType", e.target.value)}
                  isInvalid={!!errors.subAssetType}
                  disabled={!formData.assetType || loadingAssetTypes}
                >
                  <option value="">
                    Select sub asset type
                  </option>
                  {assetSubTypes.map((assetSubType) => (
                    <option key={assetSubType.id} value={assetSubType.code.toLowerCase()}>
                      {assetSubType.name} ({assetSubType.code})
                    </option>
                  ))}
                </Form.Select>
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
          </Row>

          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <Form.Label htmlFor="name">Asset Name</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  placeholder="Enter asset name"
                  value={formData.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  isInvalid={!!errors.name}
                />
                {errors.name && (
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                )}
              </div>
            </Col>
            
            <Col lg={6}>
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
          </Row>

          <Row>
            <Col lg={6}>
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
            
            <Col lg={6}>
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

          <Row>
            <Col lg={6}>
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
            
            <Col lg={6}>
              <div className="mb-3">
                <Form.Label htmlFor="warrantyDuration">Warranty Duration (months)</Form.Label>
                <Form.Control
                  type="number"
                  id="warrantyDuration"
                  placeholder="Enter warranty duration in months"
                  min="0"
                  value={formData.warrantyDuration || ""}
                  onChange={(e) => handleFieldChange("warrantyDuration", parseInt(e.target.value) || 0)}
                  isInvalid={!!errors.warrantyDuration}
                />
                {errors.warrantyDuration && (
                  <Form.Control.Feedback type="invalid">
                    {errors.warrantyDuration}
                  </Form.Control.Feedback>
                )}
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
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
            
            <Col lg={6}>
              <div className="mb-3">
                <Form.Label htmlFor="warrantyEndDate">Warranty End Date</Form.Label>
                <Form.Control
                  type="date"
                  id="warrantyEndDate"
                  value={formData.warrantyEndDate}
                  readOnly
                  className="bg-light"
                />
                <small className="text-muted">Automatically calculated based on start date and duration (months)</small>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
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
            
                          <Col lg={6}>
                <div className="mb-3">
                  <Form.Label htmlFor="departmentId">Department</Form.Label>
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
          </Row>

          <Row>
            <Col lg={6}>
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
            
            <Col lg={6}>
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
          </Row>

          <div className="text-end">
            <Button 
              variant="secondary" 
              type="button" 
              onClick={() => {
                        setFormData({
          name: "",
          assetType: "",
          subAssetType: "",
          brand: "",
          model: "",
          subModel: "",
          installationDate: "",
          warrantyDuration: 0,
          warrantyStartDate: new Date().toISOString().split('T')[0], // Current date
          warrantyEndDate: new Date().toISOString().split('T')[0], // Current date
          buildingNumber: "",
          departmentId: "",
          floorNumber: "",
          roomNumber: "",
        });
                setErrors({});
              }}
              className="me-2"
            >
              Reset
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </Form>
      </ComponentContainerCard>
    </>
  );
} 